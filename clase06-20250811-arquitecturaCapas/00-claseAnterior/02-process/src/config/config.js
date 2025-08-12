
// "c://usuarios//docuemtos//proyecto//.env"

let entorno="DEV"
let [, , ...argumentos]=process.argv
argumentos=argumentos.map(a=>a.toLowerCase())
let indiceMode=argumentos.findIndex(a=>a=="--mode")
// console.log(argumentos)
if(indiceMode!=-1){
    // validar lo que llega... 
    // console.log(indiceMode)
    entorno=argumentos[indiceMode+1]   
    // console.log(entorno)
    entorno=entorno.toUpperCase() 
}

process.loadEnvFile(entorno=="PROD"?"./.env.prod":"./.env.dev")

export const config={
    PORT: process.env.PORT || 3009, 
    MONGO_URL: process.env.MONGO_URL, 
    DB_NAME: process.env.DB_NAME
}