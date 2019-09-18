var user = require('../../models/admin/users');
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
                'password' : req.input('password')
                });

                if(newUser.save())
                {   
                    resolve({
                        success:'ok',
                        email : req.input('email'),
                        fullname:req.input('fullname')
                    });
                    
                }else{
                    reject({success:'no'})
                }


        }).then((data)=>{

            return data;
            
        }).then((data)=>{

            res.send(data);

        }).catch((data)=>{

            res.send(data)
        });


    }
}