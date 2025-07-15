import express from 'express';
import cookieParser from "cookie-parser"
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser("CoderCoder123"))
app.use(express.static('./src/public'))

app.get('/',(req,res)=>{


    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})


app.get('/set',(req,res)=>{

    let persona={
        font:"Arial", 
        fontSize: 15, 
        darkMode: false
    }

    res.cookie("cookie01", persona, {})
    res.cookie("cookie02vto01", persona, {maxAge: 5 * 1000})
    res.cookie("cookie03vto02", persona, {expires: new Date(2025, 11, 18)})
    res.cookie("cookie04signed", persona, {signed: true})
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Cookies seteadas!"});
})

app.get("/get", (req, res)=>{

    let cookies=req.cookies
    let signedCookies=req.signedCookies

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({cookies, signedCookies});
})

app.get("/del", (req, res)=>{

    // res.clearCookie("cookie03vto02")
    let nombresCookies=Object.keys(req.cookies)
    nombresCookies.forEach(n=>res.clearCookie(n))

    nombresCookies=Object.keys(req.signedCookies)
    nombresCookies.forEach(n=>res.clearCookie(n))
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Cookies eliminadas"});
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
