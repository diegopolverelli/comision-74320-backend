import {Router} from "express"

export class CustomRouter{
    constructor(){
        this.router=Router()
    }

    get(ruta, ...funciones){   //  los ... son el operador REST
        // this.router.get(ruta, this.customResponses, funciones)
        this.router.get(ruta, this.customResponses, this.procesaFunciones(funciones))
    }


    procesaFunciones=(funciones=[])=>{   // suma(a, b)=>{}, (req, res, next)=>{}... o (req, res)=>{}
        return funciones.map(fn=>{
            return async(...argumentos)=>{   // ... son REST
                try {
                    return fn(...argumentos)   // ... son SPREAD
                } catch (error) {
                    return argumentos[1].internalServerError(error.message)
                }
            }
        })
    }


    customResponses(req, res, next){
        res.success=(message, data, statusCode=200)=>res.status(statusCode).send({
            status: "OK",
            message, 
            data
        })

        res.badRequest=error=>res.status(400).send({status:"bad request", error})
        res.unauthorized=error=>res.status(401).send({status:"unauthorized", error})
        res.notfound=error=>res.status(404).send({status:"not found", error})
        res.internalServerError=error=>res.status(500).send({status:"internal server error", error})

        next()
    }
}