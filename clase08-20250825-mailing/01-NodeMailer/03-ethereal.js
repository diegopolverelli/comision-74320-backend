import nodemailer from "nodemailer"
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'maxwell39@ethereal.email',
        pass: 'ApjWbuPkxXMqKQmfaA'
    }
});

transporter.sendMail(
    {
        from:"Ventas maxwell39@ethereal.email",
        to: "diegopolverelli@hotmail.com", 
        subject: "Prueba ethereal!", 
        text: "Prueba...!!!"
    }
).then(r=>console.log("Mail enviado!"))
 .catch(e=>console.log(e))