
// @decorador(parametro1, parametro2)  // forma habitual de encontrar decoradores (en frameworks)
const suma=(a,b)=>{
    return a+b
}

console.log(suma(4,5))

const decoradorLog=funcion=>{
    return (...args)=>{   // ... son aquí op. rest
        console.log(`La funcion ${funcion.name} se ejecuto en ${new Date().toUTCString()}`)

        return funcion(...args)   // ... son aquí el op. spread
    }
}

const sumaConLog=decoradorLog(suma)

console.log(suma(8,7))
console.log(sumaConLog(8,7))
