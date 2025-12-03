import * as evidenciasModel from '../models/evidenciasModel.js';
// Crear una evidencia
export const createEvidencia = async (req, res) => {
  try {
    const newEvidencia = await evidenciasModel.createEvidencia(req.body);
    const puntosUsuario = await evidenciasModel.getPuntosUsuario(req.body.id_usuario);
    const puntosActuales = Number(puntosUsuario.puntos);
    const puntosNuevos = Number(req.body.puntos);
    if (Number.isNaN(puntosActuales) || Number.isNaN(puntosNuevos)) {
      return res.status(400).json({ error: 'Puntos inválidos' });
    }
    const nuevaPuntuacion = puntosActuales + puntosNuevos;
    await evidenciasModel.actualizarPuntosUsuario(req.body.id_usuario, nuevaPuntuacion);
    return res.status(201).json({
      mensaje: 'Evidencia creada correctamente.',
      evidencia: newEvidencia
    });
  } catch (error) {
    return res.status(400).json({ error: 'Error al crear la evidencia' });
  }
};
// Contar cuantas evidencias sube un usuario un día determinado
export const contarEvidencias = async (req, res) => {
  try {
    const { usuario, fecha } = req.query;
    if (!usuario || !fecha) {
      return res.status(400).json({ error: 'Faltan parámetros usuario o fecha' });
    }
    const resultado = await evidenciasModel.contarEvidenciasUsuarioPorDia(usuario, fecha);
    return res.status(200).json({resultado});
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener el conteo de evidencias' });
  }
};