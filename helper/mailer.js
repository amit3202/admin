var nodemailer = require('nodemailer');
var emailTemplate = require('../models/emailTemplate');
var genhelper = require('../helper/general');
const mailer = (mailType,userData) => {

    

    new Promise((res,rej)=>{

            let template  = emailTemplate.find().exec((err,result)=>{

                    let docs  = result[0];

                    if(docs)
                    {
                        let mailData = {
                            subject : docs.subject,
                            template : docs.template.replace('[ACTIVATIONURL]','http://google.com'),
                            from : docs.from,
                            to : userData.email
                        };

                       
                        res(mailData)
                    }
                    else{
                        rej(err)
                        }
                    }
                )
            

        
       


    }).then((data)=>{
        
        sendMail(data)
        
    }).catch((err)=>{

        console.log(err)

    })

   
    
}

const sendMail = (maildata) => {
    
    (async ()=>{
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'code3202@gmail.com', // generated ethereal user
                pass: 'amit@3202' // generated ethereal password
            }
        })
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: maildata.from, // sender address
            to: maildata.to, // list of receivers
            subject: maildata.subject, // Subject line
           // text: 'Hello world ?', // plain text body
            html: maildata.template // html body
        });
        
        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    })().catch(console.error)

}
module.exports = mailer;