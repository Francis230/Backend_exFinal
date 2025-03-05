import { check, validationResult } from 'express-validator';

const validacionCliente = [
    check(["nombre", "apellido", "cedula", "email", "fecha_nacimiento", "telefono", "ciudad", "direccion"])
        .exists().withMessage('Todos los campos son obligatorios')
        .notEmpty().withMessage('Los campos no pueden estar vacíos')
        .customSanitizer(value => value?.trim()),

    check(["nombre", "apellido"])
        .isLength({ min: 3, max: 12 }).withMessage('El "nombre" y "apellido" deben tener entre 3 y 12 caracteres')
        .isAlpha('es-ES', { ignore: 'áéíóúÁÉÍÓÚñÑ' }).withMessage('El "nombre" y "apellido" solo pueden contener letras'),

    check("cedula")
        .isLength({ min: 10, max: 10 }).withMessage('La "cédula" debe tener 10 dígitos')
        .isNumeric().withMessage('La "cédula" solo puede contener números'),
        
    check("fecha_nacimiento")
    .isISO8601().withMessage('La "fecha de nacimiento" debe tener el formato YYYY-MM-DD')
    .custom(value => {
        const fecha = new Date(value);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fecha.getFullYear();

        if (fecha > hoy) {
            throw new Error('La "fecha de nacimiento" no puede ser en el futuro');
        }
        if (edad < 10 || edad > 100) {
            throw new Error('La edad debe estar entre 10 y 100 años');
        }
        return true;
    }),

    check("email")
        .isEmail().withMessage('El "email" no es válido')
        .customSanitizer(value => value?.trim()),

    check("telefono")
        .isLength({ min: 10, max: 10 }).withMessage('El "teléfono" debe tener 10 dígitos')
        .isNumeric().withMessage('El "teléfono" solo puede contener números'),

    check("ciudad")
        .isLength({ min: 3, max: 20 }).withMessage('La "ciudad" debe tener entre 3 y 20 caracteres'),

    check("direccion")
        .isLength({ min: 3, max: 50 }).withMessage('La "dirección" debe tener entre 3 y 50 caracteres'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).json({ errors: errors.array() });
        }
    }
];

const validacionVehiculo = [
    check(["marca", "modelo", "anio_fabricacion", "placa", "color", "tipo_vehiculo", "kilometraje", "descripcion"])
        .exists().withMessage('Todos los campos son obligatorios')
        .notEmpty().withMessage('Los campos no pueden estar vacíos')
        .customSanitizer(value => value?.trim()),
    check("anio_fabricacion")
        .isInt({ min: 1886, max: new Date().getFullYear() }) // 1886: Primer auto fabricado
        .withMessage(`El "año de fabricación" debe ser un número entero entre 1886 y ${new Date().getFullYear()}`),

    check("kilometraje")
        .isInt({ min: 0 }).withMessage('El "kilometraje" debe ser un número entero positivo'),

    check("descripcion")
        .isLength({ min: 10, max: 200 }).withMessage('La "descripción" debe tener entre 10 y 200 caracteres'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).json({ errors: errors.array() });
        }
    }
];

const validacionReserva = [
    check(["codigo", "descripcion", "cliente", "vehiculo"])
        .exists().withMessage('Todos los campos son obligatorios')
        .notEmpty().withMessage('Los campos no pueden estar vacíos')
        .customSanitizer(value => value?.trim()),

    check("codigo")
        .isInt({ min: 1 }).withMessage('El "código" debe ser un número entero positivo'),

    check("descripcion")
        .isLength({ min: 10, max: 100 }).withMessage('La "descripción" debe tener entre 10 y 100 caracteres'),

    check("cliente")
        .isMongoId().withMessage('El "cliente" debe ser un ID válido de MongoDB'),

    check("vehiculo")
        .isMongoId().withMessage('La "vehiculo" debe ser un ID válido de MongoDB'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).json({ errors: errors.array() });
        }
    }
]

export {
    validacionCliente,
    validacionVehiculo,
    validacionReserva
}