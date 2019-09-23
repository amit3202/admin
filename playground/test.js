var user = require('../models/user');

user.findOne().exec((err,res)=>{

            console.log(res)

        })

// let template  = emailTemplate.find().exec((err,docs)=>{
//     console.log(err)
// })
// console.log(template)