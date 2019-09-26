const {checkSchema} = require('express-validator');
const users = require('../../models/admin/users')
const signupValidationSchema = {

    username : {

        custom : {
            options : (value)=>{

                return new Promise((resolve,reject)=>{
                            
                    users.countDocuments({username:value}).exec((err,count)=>{
                        
                        if(count > 0 ){
                           reject()
                        }else{
                            resolve()
                        }

                    })


                })
                }
        },
        errorMessage : 'Username already exist'

    },
    email : {
        errorMessage: 'Email already exist',
        isEmail : true,
        trim: true,
        custom : {
            options : (value)=>{

                return new Promise((resolve,reject)=>{

                    users.countDocuments({email : value}).exec((err,count)=>{

                        if(count > 0){
                            reject()
                        }else{
                            resolve()
                        }
    
    
                    })

                })

            }
        }
    }
    


}

module.exports = checkSchema(signupValidationSchema);

