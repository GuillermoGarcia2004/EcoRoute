import pool from '../config/db.js';
// Consulta para crear una evidencia
export async function createEvidencia(evidencia) {
  const { id_usuario, tipo, contenido } = evidencia;
  const [result] = await pool.query(
    'INSERT INTO evidencias (id_usuario, tipo, contenido) VALUES (?, ?, ?)',
    [id_usuario, tipo, contenido]
  );
  return { id_evidencia: result.insertId, id_usuario, tipo, contenido };
}
// Consulta actualizar puntos según la evidencia
export async function actualizarPuntosUsuario(idUsuario, puntuacion) {
  await pool.query(
    'UPDATE usuarios SET puntos = ? WHERE id_usuario = ?',
    [puntuacion, idUsuario]
  );
  return { id_usuario: idUsuario, puntos_totales: puntuacion };
}
// Consulta para obtener los puntos que tiene el usuario
export async function getPuntosUsuario(id) {
  const [rows] = await pool.query('SELECT puntos FROM usuarios WHERE id_usuario = ?',[id]);
  return rows[0];
}
// Consulta para obtener el número de evidencias de un usuario
export async function contarEvidenciasUsuarioPorDia(idUsuario, fecha) {
  const query = "SELECT id_usuario, DATE(fecha_creacion) AS fecha, COUNT(*) AS numero_evidencias FROM evidencias WHERE id_usuario = ? AND DATE(fecha_creacion) = ? GROUP BY id_usuario, DATE(fecha_creacion)";
  const [rows] = await pool.query(query,[idUsuario, fecha]);
  return rows[0];
}