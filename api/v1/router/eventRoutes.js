import { Router } from 'express';
import * as eventController from '../controllers/eventController.js';

const router = Router();

// URL LISTAR EVENTOS
router.get('/', eventController.getEvents);
// URL BORRAR EVENTO POR ID
router.delete('/:id', eventController.deleteEvent);
// URL ACTUALIZAR EVENTO POR ID
router.put('/:id', eventController.updateEvent);
// URL INSERTAR UN EVENTO
router.post('/', eventController.createEvent);

export default router;