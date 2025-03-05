// Importar JWT y el Modelo
import jwt from 'jsonwebtoken';
import Usuario from '../models/User.js';

// Método para proteger rutas
const verificarAutenticacion = async (req, res, next) => {
    // Validar si se está enviando el token
    if (!req.headers.authorization) {
        return res.status(401).json({ msg: "Lo sentimos, debes proporcionar un token" });
    }

    // Obtener el token del header
    const { authorization } = req.headers;

    try {
        // Verificar y decodificar el token
        const { id, rol } = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET);

        // Buscar usuario en la base de datos
        req.usuario = await Usuario.findById(id).lean().select("-password");

        // Si el usuario no existe, devolver error
        if (!req.usuario) {
            return res.status(403).json({ msg: "Acceso no autorizado" });
        }

        // Continuar con la ejecución del controlador
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Formato del token no válido" });
    }
};

// Exportar el middleware
export default verificarAutenticacion;