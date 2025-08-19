import express from 'express';
import { config } from './config/config.js';
import { Singleton } from './config/db.js';
const PORT=config.PORT;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get('/datos',(req,res)=>{
    Singleton.conectarDB(
        config.MONGO_URL, 
        config.DB_NAME
    )

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

Singleton.conectarDB(
    config.MONGO_URL, 
    config.DB_NAME
)
Singleton.conectarDB(
    config.MONGO_URL, 
    config.DB_NAME
)
Singleton.conectarDB(
    config.MONGO_URL, 
    config.DB_NAME
)
Singleton.conectarDB(
    config.MONGO_URL, 
    config.DB_NAME
)
Singleton.conectarDB(
    config.MONGO_URL, 
    config.DB_NAME
)