import { Router } from 'express';
import * as recycleController from '../controllers/recycleController.js';

const router = Router();

// URL LISTAR PUNTOS DE RECICLAJE
router.get('/', recycleController.getRecycles);
// URL BORRAR PUNTOS DE RECICLAJE POR ID
router.delete('/:id', recycleController.deleteRecycle);
// URL ACTUALIZAR PUNTOS DE RECICLAJEPOR ID
router.put('/:id', recycleController.updateRecycle);
// URL INSERTAR UN PUNTO DE RECICLAJE
router.post('/', recycleController.createRecycle);
// URL PARA OBTENER DIRECCIONES DE LOS PUNTOS DE RECICLAJE
router.get('/listar_direcciones', recycleController.getDirections);

export default router;