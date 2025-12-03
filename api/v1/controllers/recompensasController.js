import * as recompensasModel from '../models/recompensasModel.js';
import { htmlTemplateRecompensaComprada } from '../utils/base.js';
import { sendEmail } from './emailController.js';
// Obtener las recompensas de la base de datos
export const getRecompensas = async (req, res) => {
  try {
    const recompensas = await recompensasModel.getRecompensas();
    return res.json({ mensaje: 'Recompensas obtenidas.', recompensas });
  } catch (error) {
    return res.status(500).json({ error: error.sqlMessage || 'Error interno del servidor' });
  }
};
// Obtener las recompensas que ha comprado un usuario mediante el ID de la base de datos
export const getRecompensasOfUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'El ID debe ser un número entero mayor que cero' });
    }
    const recompensas = await recompensasModel.getRecompensasOfUser(id);
    return res.json({ mensaje: 'Recompensas obtenidas.', recompensas });
  } catch (error) {
    return res.status(500).json({ error: error.sqlMessage || 'Error interno del servidor' });
  }
}
// Obtener las recompensas que ha canjeado un usuario mediante el ID de la base de datos
export const getRecompensasCanjeadas = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'El ID debe ser un número entero mayor que cero' });
    }
    const recompensas = await recompensasModel.getRecompensasCanjeadas(id);
    return res.json({ mensaje: 'Recompensas obtenidas.', recompensas });
  } catch (error) {
    return res.status(500).json({ error: error.sqlMessage || 'Error interno del servidor' });
  }
}
// Comprar una recompensa y enviar correo con detalles
export const comprarRecompensa = async (req, res) => {
  try {
    const { id_usuario, id_recompensa, valor } = req.body;
    // Validación básica
    if (!id_usuario || !id_recompensa || !valor) {
      return res.status(400).json({ error: "Faltan datos en el body." });
    }
    const idUsuario = Number(id_usuario);
    const valorRecompensa = Number(valor);
    // 1. Obtener puntos actuales
    const puntosUsuario = await recompensasModel.getPuntosUsuario(idUsuario);
    // 2. Validar puntos
    if (Number(puntosUsuario) < valorRecompensa) {
      return res.status(400).json({ error: "Puntos insuficientes." });
    }
    // 3. Registrar compra
    const compra = await recompensasModel.comprarRecompensa({id_usuario, id_recompensa});
    // 4. Actualizar puntos
    const puntosActualizados = Number(puntosUsuario) - valorRecompensa;
    await recompensasModel.actualizarPuntosUsuario(idUsuario, puntosActualizados);
    // Obtener datos de la recompensa para el correo
    const recompensaData = await recompensasModel.getRecompensaById(id_recompensa);
    if (!recompensaData) {
      return res.status(404).json({ error: "Recompensa no encontrada." });
    }
    // Obtener email y nombre del usuario para enviar correo
    const usuarioData = await recompensasModel.getUsuarioEmail(idUsuario);
    sendEmail(usuarioData.email, "Recompensa adquirida", htmlTemplateRecompensaComprada(usuarioData.nombre + ' ' + usuarioData.apellidos, recompensaData.nombre, recompensaData.valor, recompensaData.codigo));
    return res.status(201).json({mensaje: "Recompensa comprada correctamente.", compra, puntos_restantes: puntosActualizados});
  } catch (error) {
    return res.status(500).json({error: error.sqlMessage || "Error interno del servidor."});
  }
};
// Borrar recompensa utilizando su ID
export const deleteRecompensa = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'El id debe ser un número entero mayor que cero' });
    }
    // Buscar recompensa por id antes de eliminar
    const recompensa = await recompensasModel.getRecompensaById(id);
  if (!recompensa) return res.status(404).json({ error: 'Recompensa no encontrada' });
    const success = await recompensasModel.deleteRecompensa(id);
    if (!success) return res.status(500).json({ error: 'Error al recompensa' });
    // Devolver nombre de la recompensa eliminada
    return res.json({ mensaje: 'Recompensa eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ error: error.sqlMessage || 'Error interno del servidor' });
  }
};
// Obtener datos de una recompensa usando su ID
export const getRecompensaById = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'El ID debe ser un número entero mayor que cero' });
  }
  try {
    const recompensa = await recompensasModel.getRecompensaById(id);
    if (!recompensa) return res.status(404).json({ error: 'Recompensa no encontrado' });
    return res.json({ mensaje: 'Recompensa encontrada', recompensa});
  } catch (error) {
    return res.status(500).json({ error: error.sqlMessage || 'Error interno del servidor' });
  }
};
// Actualizar una recompensa usando su ID
export const updateRecompensa = async (req, res) => {
  try {
    const recompensaId = Number(req.params.id);
    // Validar que id sea un número mayor que cero
    if (!recompensaId || recompensaId <= 0) {
      return res.status(400).json({ error: 'El id debe ser un número mayor que cero' });
    }
    // Comprobar si la recompensa existe
    const existingRecompensa = await recompensasModel.getRecompensaById(recompensaId);
    if (!existingRecompensa) {
      return res.status(404).json({ error: 'Recompensa no encontrada' });
    }
    // Actualizar recompensa
    const updatedRecompensa = await recompensasModel.updateRecompensa(recompensaId, req.body);
    return res.json({ mensaje: 'Recompensa actualizada correctamente' });
  } catch (error) {
    return res.status(400).json({ error: 'Error al actualizar la recompensa' });
  }
}
// Crear una recompensa
export const createRecompensa = async (req, res) => {
  try {
    const existingRecompensa = await recompensasModel.getRecompensaByName(req.body.nombre);
    if (existingRecompensa) {
      return res.status(409).json({ error: 'Recompensa no válida' });
    }
    const newRecompensa = await recompensasModel.createRecompensa(req.body);
    return res.status(201).json({ mensaje: 'Recompensa creada correctamente.', recompensa: newRecompensa});
  } catch (error) {
    return res.status(400).json({ error: 'Error al crear la recompensa' });
  }
};
// Canjear recompensa utilizando ID de la recompensa
export const canjearRecompensa = async (req, res) => {
  try {
    const idUsuario = parseInt(req.body.id_usuario, 10);
    const idRecompensa = parseInt(req.body.id_recompensa, 10);
    if (isNaN(idUsuario) || idUsuario <= 0 || isNaN(idRecompensa) || idRecompensa <= 0) {
      return res.status(400).json({error: "id_usuario y id_recompensa deben ser números enteros mayores que cero."});
    }
    const cambio = await recompensasModel.pasarRecompensaACanjeado(idUsuario, idRecompensa);
    const canjeado = await recompensasModel.canjearRecompensa(idUsuario, idRecompensa);
    if (!canjeado) {
      return res.status(404).json({
        error: "No existe esta recompensa para este usuario o ya fue canjeada."
      });
    }
    return res.json({mensaje: "Recompensa canjeada correctamente.", id_usuario: idUsuario, id_recompensa: idRecompensa});
  } catch (error) {
    return res.status(500).json({error: error.sqlMessage || "Error interno del servidor."});
  }
};