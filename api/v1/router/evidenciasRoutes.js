import { Router } from 'express';
import * as evidenciasController from '../controllers/evidenciasController.js';

const router = Router();

// URL INSERTAR UNA EVIDENCIA
router.post('/', evidenciasController.createEvidencia);
// URL OBTENER EVIDENCIAS DEL USUARIO
router.get('/count', evidenciasController.contarEvidencias);

export default router;