import nodemailer from "nodemailer"

const transporter=nodemailer.createTransport(
    {
        // host:"mail.miempresa.com.ar", // 192.160.0.5
        service: "gmail",
        port: 587, 
        auth: {
            user:"diegopolverelli@gmail.com",
            pass: "password de aplicaciones gmail"
        }
    }
)

const enviarMail=(para, asunto, mensaje)=>{
    return transporter.sendMail(
        {
            from:`Diego diegopolverelli@gmail.com`,
            to: para,
            subject: asunto,
            html: mensaje, 
            attachments: [
                {
                    path: "./images/diego10.jpg", 
                    filename: "diegote.jpg",
                    cid: "imagen01"
                },
                {
                    path: "./images/lio2.jpg", 
                    filename: "lio2.jpg", 
                    cid: "imagen02"

                },
                {
                    path: "./images/lio.jpg", 
                    filename: "lio1.jpg", 
                    cid: "imagen03"
                },
            ]
        }
    )
}

enviarMail(
    "diegopolverelli@hotmail.com", 
    `Prueba mail con adjuntos incrustados`, 
    `<h2>Prueba mail con adjuntos incrustados</h2>
    <img src="cid:imagen01" width="300" />
    <p style="color: blue;">Prueba...!!!</p>
    <img src="cid:imagen02" width="300" />
    <p style="color: red;">Lio Messi</p>
    <img src="cid:imagen03" width="300" />
    `    
)
.then(r=>{
    if(r.rejected.length>0){
        console.log(`Error al enviar mail`)
        return
    }
    console.log(`Mail enviado!`)
})
.catch(e=>console.log(e))