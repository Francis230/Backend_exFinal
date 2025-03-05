// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';

// Rutas especificas de cada modelo del backend 
import routersUsuario from "./routers/useRoutes.js"
import routersCliente from "./routers/clienteRoutes.js"
import routersVehiculo from "./routers/vehiculoRoutes.js"
import routersReserva from './routers/reservaRoutes.js'

// Inicializaciones
const app = express()
dotenv.config()

// Variables
app.set('port',process.env.PORT || 4000)
app.use(cors())

// Middlewares 
app.use(express.json())

// Rutas 
app.get('/', (req, res) => {
    res.send('Bienvenido a la Gestion de de renta de carros')
})

app.use('/api',routersUsuario)
app.use('/api/cliente',routersCliente)
app.use('/api/vehiculo',routersVehiculo)
app.use('/api/reserva',routersReserva)

// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))

// Exportar la instancia de express por medio de app
export default  app