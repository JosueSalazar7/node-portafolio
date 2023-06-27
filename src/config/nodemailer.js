const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP
    }
})


// send mail with defined transport object
//Defenir la estructura del correo electronico
module.exports.sendMailToUser = async(userMail,token)=>{
    //Cuerpo del metrodo
    let info = await transporter.sendMail({
    //de    
    from: 'admin@esfot.com',
    //Para
    to: userMail,
    //Asunto
    subject: "Verifica tu cuenta de correo electrónico",
    //Cuerpo del mail
    html: `<a href="https://node-portafolio-production-0681.up.railway.app//user/confirmar/${token}">Clic para confirmar tu cuenta</a>`,
    });
    //verificar en consola
    console.log("Message sent: %s", info.messageId);
}