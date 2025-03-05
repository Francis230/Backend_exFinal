import mongoose, {Schema,model} from 'mongoose'
import bcrypt from "bcryptjs"

// Crear el Schema "atributos de la tabla de la BDD"
const usuarioSchema = new Schema({
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
    email:{
        type:String,
        require:true,
        trim:true,
		unique:true
    },
    password:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        default:true
    },
    token:{
        type:String,
        default:null
    }

},{
    timestamps:true
})

// Método para cifrar el password del veterinario
usuarioSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
usuarioSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}

// Método para crear un token 
usuarioSchema.methods.crearToken = function(){
    const tokenGenerado = this.token = Math.random().toString(36).slice(2)
    return tokenGenerado
}

// Crear el Modelo Veterinario "Tabla BDD" en base al esquema llamado usuarioSchema
// Luego exportar el modelo
export default model('Usuario',usuarioSchema)