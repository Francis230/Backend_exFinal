import express from 'express';
import {listarReservas, registrarReservas, obtenerReservas, actualizarReservas , eliminarReservas} from '../controllers/reservaController.js';
import verifyAutentication from '../middlewares/autenticacion.js';
import { validacionReserva }   from '../middlewares/validaciones.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(verifyAutentication );

router.get('/listReserva', listarReservas);
router.post('/registerReserva', validacionReserva, registrarReservas);
router.get('/obtReserva/:id', obtenerReservas);
router.put('/actuReserva/:id', validacionReserva, actualizarReservas);
router.delete('/eliminarReserva/:id', eliminarReservas);

export default router;