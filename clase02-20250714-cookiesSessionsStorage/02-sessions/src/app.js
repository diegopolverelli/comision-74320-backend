import express from 'express';
import sessions from "express-session"
import { auth } from './middleware/auth.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(sessions({
    secret: "CoderCoder123",
    resave: true, 
    saveUninitialized: true
}))


app.get('/',(req,res)=>{
    if(req.session.contador){
        req.session.contador++
    }else{
        req.session.contador=1
    }

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Visitas: ${req.session.contador}`});
})


let usuarios=[
    {id:1, nombre:"Luciana", email:"luciana@test.com", password:"123", rol:"user"},
    {id:2, nombre:"Juan", email:"juan@test.com", password:"123", rol:"user"},
    {id:3, nombre:"Romina", email:"romina@test.com", password:"123", rol:"admin"},
]

app.post("/login", (req, res)=>{
    let {email, password}=req.body
    if(!email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`email | password son requeridos`})
    }

    let usuario=usuarios.find(u=>u.email==email && u.password==password)
    if(!usuario){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales inválidas`})
    }

    req.session.usuario=usuario

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Login exitoso...!!!`, usuarioLogueado: usuario});

})

app.get("/logout", (req, res)=>{
    req.session.destroy(error=>{
        if(error){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`fallo en logout`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Logout exitoso"});
    })

})

app.get("/perfil", auth, (req, res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"datos...", usuario:req.session.usuario});
})




const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
