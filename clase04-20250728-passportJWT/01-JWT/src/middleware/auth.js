import jwt from "jsonwebtoken"

export const auth= (req, res, next)=>{
    if(!req.headers.authorization){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No hay token`})
    }

    // Bearer Token   ->   BEARER asdfasdfasf.asdfasdfasdf.asdf888adsfiasdf
    let token=req.headers.authorization.split(" ")[1]

    try {
        let usuario=jwt.verify(token, process.env.SECRET)
        req.user=usuario
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Error: ${error.message}`})
    }

    next()
}