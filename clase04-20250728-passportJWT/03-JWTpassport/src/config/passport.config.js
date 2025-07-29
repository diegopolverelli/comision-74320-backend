import passport from "passport"
import passportJWT from "passport-jwt"
import local from "passport-local"
import fs from "fs"
import bcrypt from "bcrypt"

const buscarToken=req=>{
    let token=null

    if(req.cookies.cookieToken) token=req.cookies.cookieToken

    return token
}

export const iniciarPassport=()=>{
    // paso 1
    passport.use("current", 
        new passportJWT.Strategy(
            {
                secretOrKey: process.env.SECRET,
                jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscarToken])
            },
            async(contenidoToken, done)=>{
                try {
                    // return done(null, false)   // fallo en la validacion
                    return done(null, contenidoToken)  // todo OK
                } catch (error) {
                    return done(error)  // error
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
                    console.log("passport...!!!")
                    let usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf8'))

                    let usuario = usuarios.find(u => u.email === username)
                    // if (!usuario) return res.status(400).send({ error: `Error credenciales` })
                    if (!usuario) return done(null, false)  // fallo en la validacion
                
                    if (!bcrypt.compareSync(password, usuario.password)){
                        // return res.status(400).send({ error: `Error credenciales` })
                        return done(null, false)
                    } 
                
                    return done(null, usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    // paso 1'   solo aplican si usamos sessions!!!
    // passport.serializeUser()
    // passport.deserializeUser()
}