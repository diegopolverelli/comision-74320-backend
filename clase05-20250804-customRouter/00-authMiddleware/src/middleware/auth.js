export const isAdmin=(req, res, next)=>{
    // req.user
    if(req.user.rol!="admin") return res.status(403).send({error:`No tiene privilegios suficentes`})

    next()
}

export const auth=(permisos=[])=>{
    return (req, res, next)=>{
        if(!Array.isArray(permisos)) return res.status(500).send({error:`Problemas con los permisos de la ruta`})

        permisos=permisos.map(p=>p.toLowerCase())

        if(permisos.includes("public")) return next()
        
        if(!req.user || !req.user.rol) return res.status(401).send({error:`No existen usuarios autenticados`})

        if(!permisos.includes(req.user.rol.toLowerCase())) return res.status(403).send({error:`No tiene privilegios suficientes para acceder al recurso solicitado`})  

        next()
    }
}