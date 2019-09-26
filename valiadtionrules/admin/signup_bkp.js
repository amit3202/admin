const {checkSchema} = require('express-validator');
const users = require('../../models/admin/users')
const signupValidationSchema = {

    username : {

        custom : {
            options : (value)=>{

                return new Promise((resolve,reject)=>{
                            
                    users.countDocuments({username:value}).exec((err,count)=>{
                        console.log(err,count,value)

                        if(!err){
                            resolve({count})
                        }else{
                            reject({err})
                        }
                        
                    })


                }).then((data)=>{
                    console.log(data)
                        if(data.count > 0 ){
                            return true;
                        }
                        else{
                            return false;   
                        }

                }).catch((err)=>{
                    throw new Error(err)
                })
                },
            errorMessage : 'Username already exist'
        }

    }

}

module.exports = checkSchema(signupValidationSchema);

