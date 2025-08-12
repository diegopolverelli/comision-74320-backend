process.on("message", message=>{
    console.log(`Calculo bloqueante ejecutando en el proceso pid: ${process.pid}; recibió mensaje: ${message}`)
    let resultado=0
    for(let i=0; i<500_000_000; i++){
        resultado=resultado+Math.random()
    }

    process.send({
        type:"resultado", 
        resultado
    })
})