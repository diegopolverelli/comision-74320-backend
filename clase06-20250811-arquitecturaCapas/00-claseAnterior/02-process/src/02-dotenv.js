import express from 'express';
import dotenv from "dotenv"

dotenv.config({
    path:"./.env", 
    override: true, 
    quiet: true
})
// process.loadEnvFile("./.env")
// const PORT=3000;
const PORT=process.env.PORT || 3007;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
