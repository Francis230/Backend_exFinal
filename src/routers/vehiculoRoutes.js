import express from 'express';
import { listarVehiculos, detalleVehiculos, registrarVehiculo, actualizarVehiculo, eliminarVehiculo } from '../controllers/vehiculoController.js';
import verifyAutentication from '../middlewares/autenticacion.js';  // Middleware para verificar sesión
import { validacionVehiculo }   from '../middlewares/validaciones.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(verifyAutentication);

router.get('/vehiculos', listarVehiculos);          // Listar todas las materias
router.get('/:id', detalleVehiculos);       // Ver detalle de una materia
router.post('/registroVehiculo',validacionVehiculo ,registrarVehiculo);       // Registrar nueva materia
router.put('/actualizacionVehiculo/:id', validacionVehiculo,actualizarVehiculo);    // Actualizar materia
router.delete('/:id', eliminarVehiculo);   // Eliminar materia

export default router;