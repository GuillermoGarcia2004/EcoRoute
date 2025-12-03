import pool from '../config/db.js';
import { generarTokenAleatorio } from '../utils/base.js';
// Consulta para obtener las recompensas
export async function getRecompensas() {
  const query = "SELECT * FROM recompensas";
  const [rows] = await pool.query(query);
  return rows;
}
// Consulta para obtener las recompensas compradas por un usuario 
export async function getRecompensasOfUser(id) {
  const query = "SELECT r.id, r.nombre, r.descripcion FROM usuarios_recompensas ur INNER JOIN recompensas r ON ur.id_recompensa = r.id WHERE ur.id_usuario = ?";
  const [rows] = await pool.query(query, [id]);
  return rows;
}
// Consulta para obtener las recompensas canjeadas por un usuario 
export async function getRecompensasCanjeadas(id) {
  const query = "SELECT r.id, r.nombre, r.descripcion, r.codigo FROM usuarios_recompensas_canjeadas ur INNER JOIN recompensas r ON ur.id_recompensa = r.id WHERE ur.id_usuario = ?";
  const [rows] = await pool.query(query, [id]);
  return rows;
}
// Consulta para obtener una recompensa mediante su ID
export async function getRecompensaById(id) {
  const [rows] = await pool.query('SELECT * FROM recompensas WHERE id = ?', [id]);
  return rows[0];
}
// Consulta para eliminar una recompensa mediante su ID
export async function deleteRecompensa(id) {
  const [result] = await pool.query('DELETE FROM recompensas WHERE id = ?', [id]);
  return result.affectedRows > 0;
}
// Consulta para actualizar una recompensa mediante su ID
export async function updateRecompensa(id, recompensa) {
  const { nombre, descripcion, valor } = recompensa;
  await pool.query(
    'UPDATE recompensas SET nombre = ?, descripcion = ?, valor = ? WHERE id = ?',
    [nombre, descripcion, valor, id]
  );
  return { id, ...recompensa };
}
// Consulta para crear una recompensa
export async function createRecompensa(recompensa) {
  const { nombre, descripcion, valor } = recompensa;
  const codigo = generarTokenAleatorio();
  const [result] = await pool.query(
    'INSERT INTO recompensas (nombre, descripcion, valor, codigo) VALUES (?, ?, ?, ?)',
    [nombre, descripcion, valor, codigo]
  );
  return { id_recompensa: result.insertId, nombre, descripcion, valor };
}
// Consulta para obtener una recompensa por su nombre
export async function getRecompensaByName(name) {
  const [rows] = await pool.query('SELECT * FROM recompensas WHERE nombre = ?', [name]);
  return rows[0];
}
// Consulta para obtener los puntos de un usuario utilizando su ID
export async function getPuntosUsuario(id) {
  const [rows] = await pool.query(
    "SELECT puntos FROM usuarios WHERE id_usuario = ?",
    [id]
  );
  return rows.length ? rows[0].puntos : null; 
}
// Consulta para comprar una recompensa
export async function comprarRecompensa({ id_usuario, id_recompensa }) {
  const [result] = await pool.query(
    'INSERT INTO usuarios_recompensas (id_usuario, id_recompensa) VALUES (?, ?)',
    [id_usuario, id_recompensa]
  );
  return {id: result.insertId, id_usuario, id_recompensa};
}
// Consulta para actualizar los puntos del usuario después de realizar la compra
export async function actualizarPuntosUsuario(idUsuario, puntosActualizados) {
  await pool.query(
    'UPDATE usuarios SET puntos = ? WHERE id_usuario = ?',
    [puntosActualizados, idUsuario]
  );
  return { id_usuario: idUsuario, puntos: puntosActualizados };
}
// Consulta para canjear una recompensa
export async function canjearRecompensa(id_usuario, id_recompensa) {
  const [result] = await pool.query('DELETE FROM usuarios_recompensas WHERE id_usuario = ? AND id_recompensa = ?', [id_usuario, id_recompensa]);
  return result.affectedRows > 0;
}
// Consulta para pasar una recompensa canjeada al menú de recompensas canjeadas
export async function pasarRecompensaACanjeado(id_usuario, id_recompensa) {
  const [result] = await pool.query(
    'INSERT INTO usuarios_recompensas_canjeadas (id_usuario, id_recompensa) VALUES (?, ?)',
    [id_usuario, id_recompensa]
  );
  return {id: result.insertId, id_usuario, id_recompensa};
}
// Obtener email y nombre del usuario
export async function getUsuarioEmail(id_usuario) {
  const [rows] = await pool.query(
    "SELECT email, nombre, apellidos FROM usuarios WHERE id_usuario = ?",
    [id_usuario]
  );
  return rows[0];
}