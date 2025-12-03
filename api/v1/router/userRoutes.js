import { Router } from 'express';
import * as userController from '../controllers/userController.js';

const router = Router();

router.get('/', userController.getUsers);
router.get('/delete', userController.getUsersForDelete);
router.get('/all', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// URL PARA HACER LOGIN EN LA API
router.post('/auth/login', userController.login);
// URL PARA HACER EL REGISTRO EN LA API
router.post('/auth/registro', userController.createUser);
// URL PARA PONER PENDIENTE_BAJA A SI
router.put('/pendiente_baja/:id', userController.updateUserPendienteBaja);
// URL PARA VERIFICAR BAJA
router.get('/pendiente_baja/:id', userController.verificarBaja);
// URL PARA ACTIVAR EL USUARIO
router.get('/auth/active/:token', userController.activateUser);

export default router;