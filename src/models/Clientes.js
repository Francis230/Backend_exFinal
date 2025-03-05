import mongoose, {Schema,model} from 'mongoose'

// Crear el Schema "atributos de la tabla de la BDD"
const clienteSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    apellido:{
        type:String,
        require:true,
        trim:true
    },
    cedula:{
        type:Number,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true
    },
    fecha_nacimiento:{
        type:String,
        require:true,
        trim:true
    },
    telefono:{
        type:String,
        require:true,
        trim:true
    },
    ciudad:{
        type:String,
        require:true,
        trim:true
    },
    direccion:{
        type:String,
        require:true,
        trim:true
    },
    status:{
        type:Boolean,
        default:true
    },
},{
    timestamps:true
})


export default model('Cliente',clienteSchema)