import nodemailer from "nodemailer"

const transporter=nodemailer.createTransport(
    {
        service: "gmail", 
        port: 587, 
        auth:{
            user: "diegopolverelli@gmail.com", 
            pass: "password de aplicaciones gmail"
        }
    }
)

const enviarMail=(to, subject, message)=>{
    return transporter.sendMail(
        {
            from: `Diego Polverelli diegopolverelli@gmail.com`, 
            to, 
            subject, 
            html: message
        }
    )
}

enviarMail(
    `diegopolverelli@hotmail.com, diepol@yahoo.com`,
    `Prueba mail simple`, 
    `<h2>Prueba mail simple</h2>
    <p style="color: blue;">Prueba...!!!</p>
    `
)
.then(res=>{
    // console.log(res)
    if(res.rejected.length>0){
        console.log(`Algo ha salido mal...`)
        return 
    }

    console.log(`Mensaje enviado...!!!`)
})
.catch(e=>{
    console.log(e)    
})