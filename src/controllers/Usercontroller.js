import mongoose from "mongoose";
import Usuario from "../models/User.js";
import generarJWT from "../helpers/JWT.js";


const login = async(req,res)=>{
    const {email,password} = req.body

    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    
    const usuarioBDD = await Usuario.findOne({email}).select("-status -__v -token -updatedAt -createdAt")
    
    if(usuarioBDD?.confirmEmail===false) return res.status(403).json({msg:"Lo sentimos, debe verificar su cuenta"})
    
    if(!usuarioBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    
    const verificarPassword = await usuarioBDD.matchPassword(password)
    
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password no es el correcto"})
    

    const token = generarJWT(usuarioBDD._id,"usuario")

    const {nombre,apellido,_id} = usuarioBDD
    
    res.status(200).json({
        token,
        nombre,
        apellido,
        _id,
        email:usuarioBDD.email,
        rol:"usuario",
    })
}

// Método para el registro
const registro = async (req,res)=>{
    // Desestructurar los campos 
    const {email,password} = req.body
    // Validar todos los campos llenos
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    // Obtener el usuario de la BDD en base al email
    const verificarEmailBDD = await Usuario.findOne({email})
    // Validar que el email sea nuevo
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})

    // Crear la instancia del veterinario
    const nuevoUsuario = new Usuario(req.body)
    // Encriptar el password
    nuevoUsuario.password = await nuevoUsuario.encrypPassword(password)
    //Crear el token 
    const token = nuevoUsuario.crearToken()
   
    // Guaradar en BDD
    await nuevoUsuario.save()
    // Imprimir el mensaje
    res.status(200).json({msg:"Revisa tu correo electrónico para confirmar tu cuenta"})
}

export{
    login,
    registro
}