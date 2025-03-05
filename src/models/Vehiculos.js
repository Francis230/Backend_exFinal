import mongoose, {Schema,model} from 'mongoose'

// Crear el Schema "atributos de la tabla de la BDD"
const vehiculoSchema = new Schema({
    marca:{
        type:String,
        require:true,
        trim:true
    },
    modelo:{
        type:String,
        require:true,
        trim:true
    },
    anio_fabricacion:{
        type:String,
        require:true,
        trim:true
    },
    placa:{
        type:String,
        require:true,
        trim:true
    },
    color:{
        type:String,
        require:true,
        trim:true
    },
    tipo_vehiculo:{
        type:String,
        require:true,
        trim:true
    },
    kilometraje:{
        type:String,
        require:true,
        trim:true
    },
    descripcion:{
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


export default model('Vehiculo',vehiculoSchema)