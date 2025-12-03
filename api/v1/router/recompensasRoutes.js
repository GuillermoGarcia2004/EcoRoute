import { Router } from 'express';
import * as recompensasController from '../controllers/recompensasController.js';

const router = Router();

// URL LISTAR RECOMPENSAS
router.get('/', recompensasController.getRecompensas);
// URL LISTAR RECOMPENSAS COMPRADAS POR UN USUARIO
router.get('/:id', recompensasController.getRecompensasOfUser);
// URL LISTAR RECOMPENSAS CANJEADAS POR UN USUARIO
router.get('/canjeadas/:id', recompensasController.getRecompensasCanjeadas);
// URL BORRAR RECOMPENSAS POR ID
router.delete('/:id', recompensasController.deleteRecompensa);
// URL ACTUALIZAR RECOMPENSAS POR ID
router.put('/:id', recompensasController.updateRecompensa);
// URL INSERTAR UNA RECOMPENSA
router.post('/', recompensasController.createRecompensa);
// URL COMPRAR RECOMPENSA
router.post('/comprar', recompensasController.comprarRecompensa);
// URL PARA CANJEAR RECOMPENSAS
router.post('/canjear', recompensasController.canjearRecompensa);

export default router;