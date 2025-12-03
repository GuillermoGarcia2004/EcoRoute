import * as recycleModel from '../models/recycleModel.js';
// Obtener puntos de reciclaje almacenados en la base de datos
export const getRecycles = async (req, res) => {
  try {
    const recycles = await recycleModel.getRecycles();
    return res.json({ mensaje: 'Puntos de reciclaje obtenidos', recycles });
  } catch (error) {
        return res.status(500).json({ error: error.sqlMessage || 'Error interno del servidor' });
  }
};
// Obtener direcciones de los puntos de reciclaje almacenados en la base de datos
export const getDirections = async (req, res) => {
  try {
    const directions = await recycleModel.getDirections();
    return res.json({ mensaje: 'Direcciones obtenidas', directions });
  } catch (error) {
        return res.status(500).json({ error: error.sqlMessage || 'Error interno del servidor' });
  }
};
// Borrar punto de reciclaje utilizando su ID
export const deleteRecycle = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'El id debe ser un número entero mayor que cero' });
    }
    // Buscar punto de reciclaje por id antes de eliminar
    const recycle = await recycleModel.getRecycleById(id);
  if (!recycle) return res.status(404).json({ error: 'Punto de reciclaje no encontrado' });
    const success = await recycleModel.deleteRecycle(id);
    if (!success) return res.status(500).json({ error: 'Error al eliminar punto de recicleje' });
    // Devolver nombre del punto de reciclaje eliminado
    return res.json({ mensaje: 'Punto de recicleje eliminado correctamente' });
  } catch (error) {
        return res.status(500).json({ error: error.sqlMessage || 'Error interno del servidor' });
  }
};
// Obtener datos de un punto de reciclaje usando su ID
export const getRecycleById = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'El ID debe ser un número entero mayor que cero' });
  }
  try {
    const recycle = await recycleModel.getRecycleById(id);
    if (!recycle) return res.status(404).json({ error: 'Punto de reciclaje no encontrado' });
    return res.json({ mensaje: 'Punto de reciclaje encontrado', recycle});
  } catch (error) {
    return res.status(500).json({ error: error.sqlMessage || 'Error interno del servidor' });
  }
};
// Actualizar un punto de recicleje usando su ID
export const updateRecycle = async (req, res) => {
  try {
    const recycleId = Number(req.params.id);
    // Validar que id sea un número mayor que cero
    if (!recycleId || recycleId <= 0) {
      return res.status(400).json({ error: 'El id debe ser un número mayor que cero' });
    }
    // Comprobar si el punto de reciclaje existe
    const existingRecycle = await recycleModel.getRecycleById(recycleId);
    if (!existingRecycle) {
      return res.status(404).json({ error: 'Punto de reciclaje no encontrado' });
    }
    // Actualizar punto de reciclaje
    const updatedRecycle = await recycleModel.updateRecycle(recycleId, req.body);
    return res.json({ mensaje: 'Punto de reciclaje actualizado correctamente' });
  } catch (error) {
      return res.status(400).json({ error: 'Error al actualizar el punto de reciclaje' });
  }
}
// Crear un punto de reciclaje
export const createRecycle = async (req, res) => {
  try {
    const existingRecycle = await recycleModel.getRecycleByName(req.body.nombre);
    if (existingRecycle) {
      return res.status(409).json({ error: 'Punto de reciclaje no válido' });
    }
    const newRecycle = await recycleModel.createRecycle(req.body);
    return res.status(201).json({ 
      mensaje: 'Punto de reciclaje creado correctamente.', 
      recycle: newRecycle
    });
  } catch (error) {
    return res.status(400).json({ error: 'Error al crear el punto de reciclaje' });
  }
};