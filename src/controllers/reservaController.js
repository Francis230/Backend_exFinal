import mongoose from "mongoose";
import Reserva from '../models/Reservas.js';
import Cliente from '../models/Clientes.js';
import Vehiculo from '../models/Vehiculos.js';

// Obtener todas las matrículas
const listarReservas = async (req, res) => {
    try {
        // Obtener las matrículas con filtros de estudiantes y materias activos
        const reservas = await Reserva.find({status: true })
            .populate({
                path: 'cliente',
                match: { status: true },  // Filtrar solo estudiantes activos
                select: 'nombre apellido' // Muestra solo nombre y apellido del estudiante
            })
            .populate({
                path: 'vehiculo',
                match: { status: true },  // Filtrar solo materias activas
                select: 'descripcion placa modelo' // Muestra solo la descripción de la materia
            })
            .select('codigo descripcion');  // Excluir los campos createdAt, updatedAt, y __v

        // Filtrar las matrículas donde tanto el estudiante como la materia están activos
        const reservasActivas = reservas.filter(m => m.cliente && m.vehiculo);

        // Si no se encuentran matrículas activas
        if (reservasActivas.length === 0) {
            return res.status(404).json({ msg: "No se encontraron reservas actualmente" });
        }

        // Respuesta con un mensaje personalizado y las matrículas filtradas
        res.status(200).json({ 
            msg: `Bienvenido - ${req.usuario.nombre} al módulo de Reservas `, 
            reservas: reservasActivas 
        });
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ msg: "Error al obtener las matrículas", error });
    }
};

// Registrar una matrícula
const registrarReservas = async (req, res) => {
    const { cliente, vehiculo, codigo, descripcion } = req.body;

    if (!cliente || !vehiculo || !codigo || !descripcion ) {
        return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    const clienteExiste = await Cliente.findById(cliente);
    if (!clienteExiste || clienteExiste.estado === false ) return res.status(404).json({ msg: "Cliente eliminado o no encontrado" });

    const vehiculoExiste = await Vehiculo.findById(vehiculo);
    if (!vehiculoExiste || vehiculoExiste.estado === false ) return res.status(404).json({ msg: "Vehiculo eliminado o no encontrado" });


    const nuevaReserva = new Reserva({ cliente, vehiculo, codigo, descripcion});
    await nuevaReserva.save();

    res.status(201).json({ msg: "Vehiculo registrado con éxito" , reserva : nuevaReserva });
};

// Obtener una matrícula por ID
const obtenerReservas = async (req, res) => {
    const { id } = req.params;

    const reserva = await Reserva.findOne({ _id: id, status: true }).select('codigo descripcion').populate('cliente', 'nombre apellido').populate('vehiculo', 'descripcion placa modelo');
    if (!reserva) return res.status(404).json({ msg: "Reserva eliminada o no encontrada" });

    res.status(200).json(reserva);
};

// Actualizar matricula
const actualizarReservas = async (req, res) => {
    const { id } = req.params;
    const { cliente, vehiculo, codigo, descripcion } = req.body;

    // Verificar si el ID de la matrícula es válido en MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: `Reserva con el ID inválido: ${id}` });
    }

    // Buscar la matrícula en la base de datos
    const reservaExistente = await Reserva.findById(id);
    if (!reservaExistente || reservaExistente.estado === false) {
        return res.status(404).json({ msg: "Reserva eliminada o no encontrada" });
    }

    // Validar que los datos no estén vacíos
    if (!cliente || !vehiculo || !codigo || !descripcion) {
        return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    // Verificar si el estudiante y la materia existen
    const clienteExiste = await Cliente.findById(cliente);
    if (!clienteExiste || clienteExiste.estado === false) {
        return res.status(404).json({ msg: "Cliente no encontrado" });
    }

    const vehiculoExiste = await Vehiculo.findById(vehiculo);
    if (!vehiculoExiste || vehiculoExiste.estado === false) {
        return res.status(404).json({ msg: "Vehiculo no encontrado" });
    }

    // Actualizar la matrícula en una sola operación
    const reservaActualizada = await Reserva.findByIdAndUpdate(
        id,
        { cliente, vehiculo, codigo, descripcion },
        { new: true } // Retorna la matrícula actualizada
    );

    res.status(200).json({ msg: "Reserva actualizada con éxito", reserva: reservaActualizada });
}

// Eliminar una matrícula
const eliminarReservas = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: `No existe la reserva con el ID: ${id}`  });

    const reservaEliminada = await Reserva.findByIdAndUpdate(id,{status: false },{ new: true});

    if (!reservaEliminada) {
        return res.status(404).json({ msg: "Reserva no encontrada" });
    }

    res.status(200).json({ msg: "Reserva eliminada correctamente" });
};

export {
    listarReservas,
    registrarReservas,
    obtenerReservas,
    actualizarReservas,
    eliminarReservas
}