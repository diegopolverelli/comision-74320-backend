import express from 'express';
import fs from 'fs'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import { auth } from './middleware/auth.js';

process.loadEnvFile("./.env")

const PORT=process.env.PORT;

const app=express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"))

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

let usuarios=[]
if(fs.existsSync('./src/usuarios.json')){
    usuarios=JSON.parse(fs.readFileSync('./src/usuarios.json','utf-8'))
}

app.post('/registro',(req,res)=>{
    let {nombre, email, password}=req.body
    if(!nombre || !email || !password) return res.status(400).send({error:'Ingrese todos los datos'})

    let usuario=usuarios.find(u=>u.email===email)
    if(usuario) return res.status(400).send({error:`El usuario ${email} ya existe en la DB`})

    let id=1
    if(usuarios.length>0) id=usuarios[usuarios.length-1].id+1

    usuario={
        id, 
        nombre, 
        email, 
        password: bcrypt.hashSync(password, 10), 
        rol: "user"
    }

    usuarios.push(usuario)

    fs.writeFileSync('./src/usuarios.json',JSON.stringify(usuarios,null,5))

    res.json({
        usuarioCreado:usuario
    })
})

app.post('/login',(req,res)=>{
    let {email, password}=req.body
    if(!email || !password) return res.status(400).send({error:'Ingrese email y password'})

    usuarios=JSON.parse(fs.readFileSync('./src/usuarios.json','utf8'))

    let usuario=usuarios.find(u=>u.email===email)
    if(!usuario) return res.status(400).send({error:`Error credenciales`})
    
    if(!bcrypt.compareSync(password, usuario.password)) return res.status(400).send({error:`Error credenciales`})

    // si user viene de una DB, de mongo, lean()

    delete usuario.password // borrar datos sensibles antes de generar token
    let token=jwt.sign(usuario, process.env.SECRET, {expiresIn: "1h"})

    res.cookie("cookieToken", token, {httpOnly: true})
    return res.status(200).json({
        usuarioLogueado:usuario,
        // token
    })

})

app.get("/logout", (req, res)=>{

    res.clearCookie("cookieToken")
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Logout exitoso!"});
})

app.get('/usuario', auth, (req,res)=>{


    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        mensaje:'Perfil usuario '+req.user.nombre, datosUsuario: req.user
    });
});

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
