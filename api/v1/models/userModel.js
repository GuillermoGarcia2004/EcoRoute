import pool from '../config/db.js';
import { generarTokenAleatorio, crearHash } from '../utils/base.js';
// Obtener usuarios que no han solicitado la baja de la aplicación
export async function getUsers() {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE pendiente_baja = "No"');
  return rows;
}
// Obtener todos los usuarios
export async function getAllUsers() {
  const [rows] = await pool.query('SELECT * FROM usuarios');
  return rows;
}
// Obtener usuarios que han solicitado la baja de la aplicación
export async function getUsersForDelete() {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE pendiente_baja = "Si"');
  return rows;
}
// Obtener un usuario por su ID
export async function getUserById(id) {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
  return rows[0];
}
// Obtener un usuario por su token
export async function getUserByToken(token) {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE token = ?', [token]);
  return rows[0];
}
// Obtener un usuario por su email
export async function getUserByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
  return rows[0];
}
// Obtener un usuario por su email para iniciar sesión
export async function loginUserByEmail(email) {
  const [rows] = await pool.query('SELECT id_usuario, nombre, apellidos, rol, estado, perfil, email, hash FROM usuarios WHERE email = ?', [email]);
  return rows[0];
}
// Insertar un nuevo usuario 
export async function createUser(user) {
  const { email, nombre, apellidos, telefono, hash } = user;
  const token = generarTokenAleatorio();
  const hashEncriptado = await crearHash(hash);
  const [result] = await pool.query(
    'INSERT INTO usuarios (email, nombre, apellidos, telefono, hash, token) VALUES (?, ?, ?, ?, ?, ?)',
    [email, nombre, apellidos, telefono, hashEncriptado, token]
  );
  return { id: result.insertId, token, ...user };
}
// Actualizar los datos de un usuario
export async function updateUser(id, user) {
  const { email, nombre, apellidos, telefono, hash, rol, estado } = user;
  await pool.query(
    'UPDATE usuarios SET email = ?, nombre = ?, apellidos = ?, telefono = ?, hash = ?, rol = ?, estado = ? WHERE id_usuario = ?',
    [email, nombre, apellidos, telefono, hash, rol, estado, id]
  );
  return { id, ...user };
}
// Activar un usuario
export async function activateUser(token) {
  const [result] = await pool.query(
    'UPDATE usuarios SET estado = ? WHERE token = ?',
    ['Activo', token]
  );
  return result.affectedRows > 0;
}
// Enviar petición de eliminar un usuario
export async function enviarPeticionEliminarUsuario(id, fb) {
  const [result] = await pool.query(
    'UPDATE usuarios SET pendiente_baja = ?, fecha_solicitud_baja = ? WHERE id_usuario = ?',
    ['Si', fb, id]
  );
  return result.affectedRows > 0;
}
// Eliminar un usuario
export async function deleteUser(id) {
  const [result] = await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
  return result.affectedRows > 0;
}
// Verificar si un usuario está pendiente de baja para mostrar la opción de eliminar cuenta en su perfil o no
export async function verificarPendienteBaja(id) {
  const [rows] = await pool.query(
    'SELECT pendiente_baja FROM usuarios WHERE id_usuario = ?', 
    [id]
  );
  if (rows.length === 0) return null;
  return rows[0].pendiente_baja === 'Si';
}