import jwt from "jsonwebtoken"

export const auth=(req, res, next)=>{
    if(!req.headers.token){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No hay token`})
    }

    try {
        let usuario=jwt.verify(req.headers.token, "CoderCoder123")
        req.user=usuario
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`${error.message}`})
    }

    next()
}