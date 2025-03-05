import Cliente from '../models/Clientes.js';
import mongoose from "mongoose";

// Obtener todos los clientes
const listarCliente = async (req, res) => {
    const clientes = await Cliente.find({status: true }).select('nombre apellido email cedula fecha_nacimiento telefono ciudad direccion');
    res.status(200).json({msg: `Bienvenido - ${req.usuario.nombre} al modulo de clientes `, clientes} );
};

// Crear un nuevo estudiante
const registrarCliente = async (req, res) => {
    const { nombre, apellido, email , cedula , fecha_nacimiento, telefono , ciudad, direccion } = req.body;

    if (!nombre || !apellido || !email ||!cedula || !fecha_nacimiento || !telefono || !ciudad || !direccion) {
        return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    const clienteExistente = await Cliente.findOne({ email });
    if (clienteExistente) {
        return res.status(400).json({ msg: "El cliente ya está registrado" });
    }

    const nuevoCliente = new Estudiante({ nombre, apellido, email , cedula , fecha_nacimiento, telefono , ciudad, direccion });
    await nuevoCliente.save();

    res.status(201).json({ msg: "Cliente registrado con éxito" , estudiante : nuevoEstudiante});
};

// Obtener un estudiante por ID
const obtenerCliente = async (req, res) => {
    const { id } = req.params;

    const cliente = await Cliente.findById(id).select('nombre apellido email cedula fecha_nacimiento telefono ciudad direccion');
    if (!cliente) return res.status(404).json({ msg: "Cliente no encontrado" });

    res.status(200).json(cliente);
};

// Actualizar un estudiante
const actualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email , cedula , fecha_nacimiento, telefono , ciudad, direccion } = req.body;

    // Validar que no haya campos vacíos
    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }
    // Verificar si el ID es válido en MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `No existe el Cliente con ID: ${id}` });
    }
    // Buscar el estudiante a actualizar en la base de datos
    const clienteActualizado = await Cliente.findByIdAndUpdate(id, { nombre, apellido, email , cedula , fecha_nacimiento, telefono , ciudad, direccion }, { new: true });

    if (!clienteActualizado) return res.status(404).json({ msg: "Cliente no encontrado" });

    // Actualizar la materia
    await Cliente.findByIdAndUpdate(id, req.body);
    res.status(200).json({ msg: "Cliente actualizado con éxito" });
};

// Eliminar un estudiante (soft delete)
const eliminarCliente = async (req, res) => {
    const { id } = req.params;

   // Verificar si el ID es válido en MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `No existe el estudiante con ID: ${id}` });
    }
    // Buscar y eliminar al estudiante
    const clientEliminada = await Cliente.findByIdAndUpdate(id, { status: false}, {new: true} );
    // Si no se encuentra la materia, enviar error
    if (!clientEliminada) {
        return res.status(404).json({ msg: "Cliente no encontrado" });
    }
    // await Estudiante.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({ msg: "Cliente eliminado correctamente" });
};

export {
    listarCliente,
    registrarCliente,
    obtenerCliente,
    actualizarCliente,
    eliminarCliente
}