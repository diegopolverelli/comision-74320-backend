import express from 'express';
import {fork} from "child_process"
import { config } from './config/config.js';
// config
const PORT=config.PORT;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let contador=0
app.get('/',(req,res)=>{
    contador++

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Home page - visitas: ${contador}`});
})

app.get("/prueba", (req, res)=>{
    let resultado=0
    let child=fork("./src/calculo.js")
    child.send(`Soy el proceso ${process.pid} y necesito que ejecutes...!!!`)

    child.on("message", datos=>{
        if(datos.type=="resultado"){

            res.setHeader('Content-Type','application/json');
            return res.status(200).json({resultado:datos.resultado});
        }
    })

    // for(let i=0; i<500_000_000; i++){
    //     resultado=resultado+Math.random()
    // }

})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT} - id proceso: ${process.pid}`);
});
