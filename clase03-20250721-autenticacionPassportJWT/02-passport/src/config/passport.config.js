import passport from "passport"
// import {Strategy as LocalStrategy} from "passport-local"
import local from "passport-local"
import bcrypt from "bcrypt"
import { usuariosModelo } from "../models/usuario.model.js"

export const iniciarPassport=()=>{
    // paso 1:
    passport.use("registro", 
        new local.Strategy(
            {
                usernameField: "email",
                // passwordField: "clave",
                passReqToCallback: true
            }, 
            async(req, username, password, done)=>{
                try {
                    let {nombre, apellido}=req.body
                    if(!nombre || !apellido){
                        return done(null, false)   // fallo en validacion
                    }

                    // resto validaciones
                    password=bcrypt.hashSync(password, 10)
                    let nuevoUsuario=await usuariosModelo.create({nombre, apellido, email: username, password})

                    return done(null, nuevoUsuario)  // hay un usuario
                } catch (error) {
                    return done(error)   // ocurre un error
                }
            }
        )
    )

    passport.use("login", 
        new local.Strategy(
            {
                usernameField:"email"
            }, 
            async(username, password, done)=>{
                try {
                    let usuario=await usuariosModelo.findOne({email: username}).lean()
                    if(!usuario){
                        return done(null, false)
                    }

                    if(!bcrypt.compareSync(password, usuario.password)){
                        return done(null, false)
                    }

                    delete usuario.password // borrar datos sensibles
                    return done(null, usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    // paso 1' o 1b)   solo si uso sessions
    passport.serializeUser((user, done)=>{
        return done(null, user)
    })

    passport.deserializeUser((user, done)=>{
        return done(null, user)
    })
}