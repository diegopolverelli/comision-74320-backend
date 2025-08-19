import { config } from "../config/config.js"
import { Singleton } from "../config/db.js";
// import { usuariosFsDAO } from "./usuariosFsDAO.js";    

export let DAO

const {PERSISTENCE}=config

switch (PERSISTENCE) {
    case "FS":
        DAO=(await import("./usuariosFsDAO.js")).usuariosFsDAO
        break;
    case "MONGO":
        Singleton.conectarDB(
            config.MONGO_URL, 
            config.DB_NAME
        )
        
        let dao1=await import("./usuariosMongoDAO.js")
        DAO=dao1.usuariosMongoDAO
        break;

    default:
        throw new Error(`Persistencia mal configurada. Revise variables de entorno`)
        break;
}