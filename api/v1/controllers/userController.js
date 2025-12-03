import * as userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { sendEmail } from "./emailController.js";
import { htmlTemplateActivarCuenta, htmlTemplateBorrarCuenta, htmlTemplateCuentaActivada, htmlTemplateSolicitarBorrarCuenta} from "./../utils/base.js";
// Obtener usuarios de la base de datos que no han solicitado la baja de la aplicación
export const getUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    return res.json({ mensaje: "Usuarios obtenidos", users });
  } catch (error) {
    return res.status(500).json({ error: error.sqlMessage || "Error interno del servidor" });
  }
};
// Obtener todos los usuarios de la base de datos
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    return res.json({ mensaje: "Usuarios obtenidos", users });
  } catch (error) {
    return res.status(500).json({ error: error.sqlMessage || "Error interno del servidor" });
  }
};
// Obtener usuarios que han solicitado la baja de la aplicación
export const getUsersForDelete = async (req, res) => {
  try {
    const users = await userModel.getUsersForDelete();
    return res.json({ mensaje: "Usuarios obtenidos", users });
  } catch (error) {
    return res.status(500).json({ error: error.sqlMessage || "Error interno del servidor" });
  }
};
// Buscar un usuario por su ID
export const getUserById = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "El ID debe ser un número entero mayor que cero" });
  }
  try {
    const user = await userModel.getUserById(id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    return res.json({ mensaje: "Usuario encontrado", user });
  } catch (error) {
    return res.status(500).json({ error: error.sqlMessage || "Error interno del servidor" });
  }
};
// Iniciar sesión
export const login = async (req, res) => {
  try {
    // Validación estricta: el body debe contener exactamente las keys 'email' y 'clave'
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ error: "El body debe ser un JSON con {email, clave}" });
    }
    const keys = Object.keys(req.body).sort();
    const expected = ["clave", "email"];
    if (keys.length !== expected.length || keys[0] !== expected[0] || keys[1] !== expected[1]) {
      return res.status(400).json({ error: "El body debe ser exactamente {email, clave}" });
    }
    const { email, clave } = req.body;
    if (typeof email !== "string" || !email.trim() || typeof clave !== "string" || !clave) {
      return res.status(400).json({error: "Los campos email y clave deben ser cadenas no vacías"});
    }
    const user = await userModel.loginUserByEmail(email);
    if (!user) return res.status(401).json({ error: "Credenciales inválidas" });
    // Comprobar que el usuario esté activo
    if (user.estado && user.estado !== "Activo") {
      return res.status(403).json({ error: "Usuario inactivo" });
    }
    const isValid = await bcrypt.compare(clave, user.hash);
    if (!isValid)
      return res.status(401).json({ error: "Credenciales inválidas" });
    // devolver datos del usuario sin campos sensibles
    const safeUser = { ...user };
    if ("hash" in safeUser) delete safeUser.hash;
    if ("token" in safeUser) delete safeUser.token;
    return res.json({ mensaje: "Autenticación correcta", user: safeUser });
  } catch (error) {
    return res.status(500).json({error: error.message || error.sqlMessage || "Error interno del servidor"});
  }
};
// Registrar usuario
export const createUser = async (req, res) => {
  try {
    // Verificar si el usuario ya existe por email (u otro campo único)
    const existingUser = await userModel.getUserByEmail(req.body.email);
    if (existingUser) {
      return res.status(409).json({ error: "Usuario no válido" });
    }
    // Crear nuevo usuario
    const newUser = await userModel.createUser(req.body);
    // Enviar el correo electrónico de activación
    sendEmail(newUser.email, "Activar cuenta", htmlTemplateActivarCuenta(newUser.nombre + " " + newUser.apellidos, `http://localhost:3000/api/v1/ecoroute/usuarios/auth/active/${newUser.token}/`));
    return res.status(201).json({mensaje: "Usuario creado correctamente. Revise su correo electrónico"});
  } catch (error) {
    return res.status(400).json({ error: "Error al crear al usuario" });
  }
};
// Activar cuenta del usuario
export const activateUser = async (req, res) => {
  const token = req.params.token; // Token desde /active/:token
  if (!token) {
    return res.status(400).json({ error: "Token no proporcionado" });
  }
  const usuario = await userModel.getUserByToken(token);
  if (!usuario) {
    return res.status(400).json({ error: "Token no encontrado" });
  }
  const ahora = new Date();
  const tokenExpira = new Date(usuario.token_expira_a);
  // Comprobación de expiración del token
  if (tokenExpira < ahora) {
    return res.status(400).json({ error: "Token expirado" });
  }
  const activarUsuario = await userModel.activateUser(token);
  // Enviar el correo electrónico de confirmación de activación
  sendEmail(usuario.email, "Confirmar activación de cuenta", htmlTemplateCuentaActivada(usuario.nombre + " " + usuario.apellidos));
  return res.redirect("http://localhost:5173/activar-cuenta");
};
// Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    // Validar que id sea un número mayor que cero
    if (!userId || userId <= 0) {
      return res.status(400).json({ error: "El id debe ser un número mayor que cero" });
    }
    // Comprobar si el usuario existe
    const existingUser = await userModel.getUserById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    // Actualizar usuario
    const updatedUser = await userModel.updateUser(userId, req.body);
    return res.json({ mensaje: "Usuario actualizado correctamente" });
  } catch (error) {
    return res.status(400).json({ error: "Error al actualizar al usuario" });
  }
};
// Enviar petición de baja del usuario al administrador
export const updateUserPendienteBaja = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    // Validar que id sea un número mayor que cero
    if (!userId || userId <= 0) {
      return res.status(400).json({ error: "El id debe ser un número mayor que cero" });
    }
    // Comprobar si el usuario existe
    const existingUser = await userModel.getUserById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const fechaFormateada = [now.getFullYear(), pad(now.getMonth() + 1), pad(now.getDate())].join("-") + " " + [pad(now.getHours()), pad(now.getMinutes()), pad(now.getSeconds())].join(":");
    // Actualizar usuario
    const updatedUser = await userModel.enviarPeticionEliminarUsuario(userId, fechaFormateada);
    sendEmail(existingUser.email, "Solicitar eliminación de cuenta", htmlTemplateSolicitarBorrarCuenta(existingUser.nombre + " " + existingUser.apellidos, fechaFormateada));
    return res.json({ mensaje: "Usuario actualizado correctamente" });
  } catch (error) {
    return res.status(400).json({ error: "Error al actualizar al usuario" });
  }
};
// Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "El id debe ser un número entero mayor que cero" });
    }
    // Buscar usuario por id antes de eliminar
    const user = await userModel.getUserById(id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    const success = await userModel.deleteUser(id);
    if (!success)
      return res.status(500).json({ error: "Error al eliminar usuario" });
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const fechaFormateada = [now.getFullYear(), pad(now.getMonth() + 1), pad(now.getDate())].join("-") + " " + [pad(now.getHours()), pad(now.getMinutes()), pad(now.getSeconds())].join(":");
    sendEmail(user.email, "Confirmar eliminación de cuenta", htmlTemplateBorrarCuenta(user.nombre + " " + user.apellidos, fechaFormateada));
    // Devolver nombre del usuario eliminado
    return res.json({mensaje: "Usuario eliminado correctamente", nombre: user.nombre, apellidos: user.apellidos});
  } catch (error) {
    return res.status(500).json({ error: error.sqlMessage || "Error interno del servidor" });
  }
};
// Verificar si el usuario ha solicitado la baja
export const verificarBaja = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    // Validar que id sea un número mayor que cero
    if (!userId || userId <= 0) {
      return res.status(400).json({ error: "El id debe ser un número mayor que cero" });
    }
    // Verificar estado pendiente_baja
    const pendiente = await userModel.verificarPendienteBaja(userId);
    if (pendiente === null) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    // Responder con el formato esperado por el frontend
    return res.json({ pendiente: pendiente });
  } catch (error) {
    return res.status(500).json({ error: error.sqlMessage || "Error interno del servidor" });
  }
};