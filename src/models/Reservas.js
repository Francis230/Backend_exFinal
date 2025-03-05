import mongoose, {Schema,model} from 'mongoose'

// Crear el Schema "atributos de la tabla de la BDD"
const reservaSchema = new Schema({
    codigo:{
        type:Number,
        require:true,
        trim:true
    },
    descripcion:{
        type:String,
        require:true,
        trim:true
    },
    cliente:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cliente'
    },
    vehiculo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vehiculo'
    },
    status:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})


export default model('Reserva',reservaSchema)