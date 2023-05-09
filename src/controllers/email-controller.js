const nodemailer = require('nodemailer');

const  EMAIL_ID  = process.env.EMAIL_ID;
const EMAIL_PASS= process.env.EMAIL_PASS

const send_Email = async (data ,req ,res) =>{

    const sender = nodemailer.createTransport( {
        service: 'Gmail',
        auth: {
            
            user: EMAIL_ID,
            pass: 
        }
       
     } );
     
    let info = await sender.sendMail(
        {
               
            to: data.recepientEmail ,
            content: data.content,
            subject: data.subject
        }
    );

    console.log('email  has send to ',data.recepientEmail)
}

 module.exports = send_Email;
