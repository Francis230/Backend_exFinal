import express from 'express';
import {obtenerCliente, registrarCliente, actualizarCliente, eliminarCliente, listarCliente} from "../controllers/clienteController.js";
import verifyAutentication from '../middlewares/autenticacion.js';
import { validacionCliente }   from '../middlewares/validaciones.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(verifyAutentication);

router.get('/listClientes', listarCliente);
router.post('/registerClientes',validacionCliente, registrarCliente);
router.get('/oneClientes/:id', obtenerCliente);
router.put('/actuClientes/:id', validacionCliente, actualizarCliente);
router.delete('/elimiClientes/:id', eliminarCliente);

export default router; 

