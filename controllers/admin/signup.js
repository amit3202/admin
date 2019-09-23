var user = require('../../models/admin/users');
var mailer = require('../../helper/mailer');
var cnt = require('../../config/constant');
var addDays = require('date-fns/addDays');
module.exports = {
    index : (req,res)=>{

        new Promise((resolve,reject)=>{

            let newUser = new user({
                'personal.fullname':req.input('fullname'),
                'personal.address':req.input('address'),
                'personal.city' : req.input('city'),
                'personal.country' : req.input('country'),
                'username': req.input('username'),
                'email':req.input('email'),
                'password' : req.input('password'),
                'activation.code' : 'sdfshdgf',
                'activation.validUpto' : addDays(new Date(),1)
                    });

                    (async ()=>{

                        var savedUser = await newUser.save();
                        if(savedUser.id){

                            resolve({
                                success:'ok',
                                email : savedUser.email,
                                fullname: savedUser.personal.fullname,
                                activation : savedUser.activation
                            });

                        }else{
                            reject({success:'no'}) 
                        }   
                        

                    })().catch((err)=>{
                        console.log(err)
                        reject({success:'no'})
                    })


        }).then((data)=>{

            mailer(cnt.SIGNUPVERIFICATION,data);    
            return data;
            
        }).then((data)=>{

            res.send(data);

        }).catch((data)=>{

            res.send(data)
        });


    }
}