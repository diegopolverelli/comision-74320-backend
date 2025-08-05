import express from 'express';
import fs from 'fs'
import bcrypt from "bcrypt"
import passport from "passport"
import local from "passport-local"
import passportJWT from "passport-jwt"
import jwt from "jsonwebtoken"
import { passportCall } from './utils.js';
import { auth, isAdmin } from './middleware/auth.js';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())

passport.use("registro", new local.Strategy(
    {
        usernameField: "email",
        passReqToCallback: true
    },
    async function (req, username, password, done) {
        try {
            let { nombre } = req.body
            if (!nombre) {
                return done(null, false, { message: `Falta ingresar el nombre` })
            } // return res.status(400).send({error:'Ingrese todos los datos'})

            let usuario = usuarios.find(u => u.email === username)
            if (usuario) {
                return done(null, false, { message: `El usuario con email ${username} ya existe en la DB` })
            } // return res.status(400).send({error:`El usuario ${email} ya existe en la DB`})

            let id = 1
            if (usuarios.length > 0) id = usuarios[usuarios.length - 1].id + 1

            usuario = {
                id,
                nombre,
                email: username,
                password: bcrypt.hashSync(password, 10),
                rol: "user"
            }

            usuarios.push(usuario)

            fs.writeFileSync('./src/usuarios.json', JSON.stringify(usuarios, null, 5))

            return done(null, usuario)
        } catch (error) {
            return done(error)
        }
    }
))

passport.use("current", new passportJWT.Strategy(
    {
        secretOrKey: "CoderCoder123",
        jwtFromRequest: passportJWT.ExtractJwt.fromUrlQueryParameter("token")
    },
    async function (usuario, done) {
        try {
            return done(null, usuario)
        } catch (error) {
            return done(error)
        }
    }
))

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})

let usuarios = []
if (fs.existsSync('./src/usuarios.json')) {
    usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf-8'))
}

// app.get('/protected', function (req, res, next) {
//     passport.authenticate('local', function (err, user, info, status) {
//         if (err) { return next(err) }   // return done(error)
//         if (!user) { return res.redirect('/signin') }   // return done(null, false)
//         res.redirect('/account');  // return done(null, user)
//     })(req, res, next);
// });


app.post(
    '/registro',
    // passport.authenticate("registro", { session: false }),
    passportCall("registro"),
    (req, res) => {
        // let {nombre, email, password}=req.body
        // if(!nombre || !email || !password) return res.status(400).send({error:'Ingrese todos los datos'})

        // let usuario=usuarios.find(u=>u.email===email)
        // if(usuario) return res.status(400).send({error:`El usuario ${email} ya existe en la DB`})

        // let id=1
        // if(usuarios.length>0) id=usuarios[usuarios.length-1].id+1

        // usuario={
        //     id, 
        //     nombre, 
        //     email, 
        //     password: bcrypt.hashSync(password, 10), 
        //     rol: "user"
        // }

        // usuarios.push(usuario)

        // fs.writeFileSync('./src/usuarios.json',JSON.stringify(usuarios,null,5))

        res.json({
            message: `Registro existoso para ${req.user.nombre}`,
            usuarioCreado: req.user
        })
    }
)

app.post('/login', (req, res) => {
    let { email, password } = req.body
    if (!email || !password) return res.status(400).send({ error: 'Ingrese email y password' })

    usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf8'))

    let usuario = usuarios.find(u => u.email === email)
    if (!usuario) return res.status(400).send({ error: `Error credenciales` })

    if (!bcrypt.compareSync(password, usuario.password)) return res.status(400).send({ error: `Error credenciales` })

    // let token=jwt.sign(usuario, "CoderCoder123", {expiresIn:"2 minutes"})
    let token=jwt.sign(usuario, "CoderCoder123", {expiresIn:"20 minutes"})

    return res.status(200).json({
        usuarioLogueado: usuario,
        token
    })

})

app.get(
    '/usuario',
    // passport.authenticate("current", {session:false}),
    passportCall("current"), // autentico
    // isAdmin,
    auth(["user", "admin"]),
    (req, res) => {


        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            mensaje: 'Perfil usuario', datos: req.user
        });
    }
);

app.get(
    '/datos',
    // passport.authenticate("current", {session:false}),
    passportCall("current"), // autentico
    // isAdmin,
    auth(["manager", "admin"]),
    (req, res) => {


        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            mensaje: 'Datos', datos: req.user
        });
    }
);


app.get(
    '/datos2',
    // passport.authenticate("current", {session:false}),
    passportCall("current"), // autentico
    // isAdmin,
    auth(["public"]),
    (req, res) => {


        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            mensaje: 'Datos 2', datos: req.user
        });
    }
);



const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});
