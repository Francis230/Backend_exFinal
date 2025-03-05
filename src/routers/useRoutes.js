// Importar Router de Express
import {Router} from 'express'

// Crear una instancia de Router() 
const router = Router()

import {login,registro} from "../controllers/Usercontroller.js"

// Rutas Publicas 
router.post("/login", login);
router.post("/registro", registro);

// Rutas Privadas


// Exportar la variable router
export default router