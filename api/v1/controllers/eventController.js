import * as eventModel from '../models/eventModel.js';
// Obtener eventos almacenados en la base de datos
export const getEvents = async (req, res) => {
  try {
    const events = await eventModel.getEvents();
    return res.json({ mensaje: 'Eventos obtenidos', events });
  } catch (error) {
    return res.status(500).json({ error: error.sqlMessage || 'Error interno del servidor' });
  }
};
// Borrar evento utilizando su ID
export const deleteEvent = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'El id debe ser un número entero mayor que cero' });
    }
    // Buscar evento por id antes de eliminar
    const event = await eventModel.getEventById(id);
  if (!event) return res.status(404).json({ error: 'Evento no encontrado' });
    const success = await eventModel.deleteEvent(id);
    if (!success) return res.status(500).json({ error: 'Error al eliminar evento' });
    // Devolver nombre del evento eliminado
    return res.json({ mensaje: 'Evento eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: error.sqlMessage || 'Error interno del servidor' });
  }
};
// Obtener datos de un evento usando su ID
export const getEventById = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'El ID debe ser un número entero mayor que cero' });
  }
  try {
    const event = await eventModel.getEventById(id);
    if (!event) return res.status(404).json({ error: 'Evento no encontrado' });
    return res.json({ mensaje: 'Evento encontrado', event });
  } catch (error) {
    return res.status(500).json({ error: error.sqlMessage || 'Error interno del servidor' });
  }
};
// Actualizar un evento usando su ID
export const updateEvent = async (req, res) => {
  try {
    const eventId = Number(req.params.id);
    // Validar que id sea un número mayor que cero
    if (!eventId || eventId <= 0) {
      return res.status(400).json({ error: 'El id debe ser un número mayor que cero' });
    }
    // Comprobar si el evento existe
    const existingEvent = await eventModel.getEventById(eventId);
    if (!existingEvent) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }
    // Actualizar evento
    const updatedEvent = await eventModel.updateEvent(eventId, req.body);
    return res.json({ mensaje: 'Evento actualizado correctamente' });
  } catch (error) {
    return res.status(400).json({ error: 'Error al actualizar el evento' });
  }
};
// Crear un evento
export const createEvent = async (req, res) => {
  try {
    const existingEvent = await eventModel.getEventByName(req.body.nombre);
    if (existingEvent) {
      return res.status(409).json({ error: 'Evento no válido' });
    }
    const newEvent = await eventModel.createEvent(req.body);
    return res.status(201).json({mensaje: 'Evento creado correctamente.', event: newEvent});
  } catch (error) {
    return res.status(400).json({ error: 'Error al crear el evento' });
  }
};