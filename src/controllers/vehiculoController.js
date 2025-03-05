import Vehiculo from '../models/Vehiculos.js';
import mongoose from "mongoose";

// Obtener todas las materias
const listarVehiculos = async (req, res) => {
    const vehiculos = await Vehiculo.find({ status: true }).select('nombre descripcion codigo creditos');
    res.status(200).json({ msg: `Bienvenido - ${req.usuario.nombre} al módulo de Vehiculos`, vehiculos });
};

// Obtener el detalle de una materia por ID
const detalleVehiculos = async (req, res) => {
    const { id } = req.params;
    
    // Verificar si el ID es válido
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).json({ msg: `No existe el vehiculo con ID: ${id}` });

    try {
        // Obtener la materia solo con los campos necesarios
        const vehiculo = await Vehiculo.findOne({ _id: id, status: true }).select('nombre descripcion codigo creditos');  // Seleccionar solo los campos relevantes

        if (!vehiculo) return res.status(404).json({ msg: "Vehiculo eliminado o no encontrado" });

        // Enviar la respuesta con la materia obtenida
        res.status(200).json(vehiculo);
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ msg: "Error al obtener el vehiculo", error });
    }
};

// Registrar una nueva materia
const registrarVehiculo = async (req, res) => {
    const { marca, modelo, anio_fabricacion, placa, color, tipo_vehiculo, kilometraje, descripcion } = req.body;

    // Validar campos vacíos
    if (!marca || !modelo || !anio_fabricacion || !placa || !color || !tipo_vehiculo|| !kilometraje || !descripcion) 
        return res.status(400).json({ msg: "Todos los campos son obligatorios" });

    // Verificar si el código de la materia ya existe
    const vehiculoExiste = await Vehiculo.findOne({ placa });
    if (vehiculoExiste) return res.status(400).json({ msg: "La placa del vehiculo ya está registrado" });

    // Crear la nueva materia
    const nuevoVehiculo = new Vehiculo(req.body);
    await nuevoVehiculo.save();

    res.status(201).json({ msg: "Vehiculo registrado exitosamente", vehiculo: nuevoVehiculo });
};

const actualizarVehiculo = async (req, res) => {
    const { id } = req.params;
    // const { nombre, apellido, email , cedula , fecha_nacimiento, telefono , ciudad, direccion } = req.body;

    // Validar que no haya campos vacíos
    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }

    // Verificar si el ID es válido en MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `No existe la materia con ID: ${id}` });
    }

    // Buscar la materia antes de actualizar
    const vehiculoExistente = await Vehiculo.findById(id);
    
    if (!vehiculoExistente || vehiculoExistente.estado === false) {
        return res.status(404).json({ msg: "No se encontró el vehiculo a actualizar" });
    }

    // Actualizar la vehiculo
    await Vehiculo.findByIdAndUpdate(id, req.body);

    res.status(200).json({ msg: "Vehiculo actualizado con éxito" });
};

// Eliminar (dar de baja) una materia
const eliminarVehiculo = async (req, res) => {
    const { id } = req.params;

    // Verificar si el ID es válido en MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `No existe el vehiculo con el ID: ${id}` });
    }

    // Buscar y eliminar la materia
    const vehiculoEliminada = await Vehiculo.findByIdAndUpdate(id, { status: false}, {new: true});

    // Si no se encuentra la materia, enviar error
    if (!vehiculoEliminada) {
        return res.status(404).json({ msg: "Vehiculo no encontrado" });
    }

    // Responder con mensaje de éxito
    res.status(200).json({ msg: "Vehiculo eliminada correctamente" });
};


export {
    listarVehiculos,
    detalleVehiculos,
    registrarVehiculo,
    actualizarVehiculo,
    eliminarVehiculo
};