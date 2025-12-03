import pool from '../config/db.js';
// Consulta para obtener los eventos
export async function getEvents() {
  const query = "SELECT e.*, CONCAT(u.nombre, ' ', u.apellidos) AS creador FROM eventos e JOIN usuarios u ON e.id_usuario = u.id_usuario";
  const [rows] = await pool.query(query);
  return rows;
}
// Consulta para obtener un evento mediante su ID
export async function getEventById(id) {
  const [rows] = await pool.query('SELECT * FROM eventos WHERE id_evento = ?', [id]);
  return rows[0];
}
// Consulta para eliminar un evento mediante su ID
export async function deleteEvent(id) {
  const [result] = await pool.query('DELETE FROM eventos WHERE id_evento = ?', [id]);
  return result.affectedRows > 0;
}
// Consulta para actualizar un evento mediante su ID
export async function updateEvent(id, event) {
  const { nombre, fecha, lugar } = event;
  await pool.query(
    'UPDATE eventos SET nombre = ?, fecha = ?, lugar = ? WHERE id_evento = ?',
    [nombre, fecha, lugar, id]
  );
  return { id, ...event };
}
// Consulta para crear un evento
export async function createEvent(event) {
  const { nombre, fecha, lugar, creador } = event;
  const [result] = await pool.query(
    'INSERT INTO eventos (id_usuario, nombre, fecha, lugar) VALUES (?, ?, ?, ?)',
    [creador, nombre, fecha, lugar]
  );
  return { id_evento: result.insertId, nombre, fecha, lugar, creador };
}
// Consulta para obtener un evento por su nombre
export async function getEventByName(name) {
  const [rows] = await pool.query('SELECT * FROM eventos WHERE nombre = ?', [name]);
  return rows[0];
}