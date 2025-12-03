import pool from '../config/db.js';
// Consulta para obtener los puntos de reciclaje
export async function getRecycles() {
  const query = "SELECT * FROM puntos_recogida";
  const [rows] = await pool.query(query);
  return rows;
}
// Consulta para obtener las direcciones de los puntos de reciclaje
export async function getDirections() {
  const query = "SELECT id, direccion_usuario FROM puntos_recogida";
  const [rows] = await pool.query(query);
  return rows;
}
// Consulta para obtener un punto de reciclaje mediante su ID
export async function getRecycleById(id) {
  const [rows] = await pool.query('SELECT * FROM puntos_recogida WHERE id = ?', [id]);
  return rows[0];
}
// Consulta para eliminar un punto de reciclaje mediante su ID
export async function deleteRecycle(id) {
  const [result] = await pool.query('DELETE FROM puntos_recogida WHERE id = ?', [id]);
  return result.affectedRows > 0;
}
// Consulta para actualizar un punto de reciclaje mediante su ID
export async function updateRecycle(id, recycle) {
  const { nombre, descripcion, direccion_usuario, direccion_administrador } = recycle;
  await pool.query(
    'UPDATE puntos_recogida SET nombre = ?, descripcion = ?, direccion_usuario = ?, direccion_administrador = ? WHERE id = ?',
    [nombre, descripcion, direccion_usuario, direccion_administrador, id]
  );
  return { id, ...recycle };
}
// Consulta para crear un punto de reciclaje
export async function createRecycle(recycle) {
  const { creador, nombre, descripcion, direccion_usuario, direccion_administrador } = recycle;
  const [result] = await pool.query(
    'INSERT INTO puntos_recogida (id_usuario, nombre, descripcion, direccion_usuario, direccion_administrador) VALUES (?, ?, ?, ?, ?)',
    [creador, nombre, descripcion, direccion_usuario, direccion_administrador]
  );
  return { id_punto: result.insertId, creador, nombre, descripcion, direccion_usuario, direccion_administrador };
}
// Consulta para obtener un punto de reciclaje por su nombre
export async function getRecycleByName(name) {
  const [rows] = await pool.query('SELECT * FROM puntos_recogida WHERE nombre = ?', [name]);
  return rows[0];
}