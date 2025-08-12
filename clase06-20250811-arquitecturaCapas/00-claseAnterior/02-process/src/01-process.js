import fs from "fs"
console.log(`Prueba process`)
console.log("Id de proceso:", process.pid)
console.log("Directorio de trabajo:", process.cwd())
console.log("Uso de memoria:", process.memoryUsage())

// console.log("Variables de entorno:", process.env)
console.log("Secret:", process.env.PRUEBA_SECRET)
console.log("PORT:", process.env.PRUEBA_PORT || 3000)

// console.log("argumentos:", process.argv)

let [rutaNode, rutaScrit, ...argumentos]=process.argv   // ... son aquí el operador REST

// console.log(argumentos)

let indicePort
indicePort=argumentos.findIndex(a=>a=="--port")
if(indicePort==-1){
    console.log(`El argumento --port es requerido`)
    process.exit()
}

let PORT=argumentos[indicePort+1]
console.log(`Server on line en puerto ${PORT}`)