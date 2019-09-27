var users = require('../../models/admin/users');
var genhelper = require('../../helper/general');
module.exports = {
    index: (req,res)=>{

        let data = {};
        if(req.session.renderData != undefined)
        {   data = {...req.session.renderData};
            delete(req.session.renderData);
        }
            
        res.render('admin/login',{layout : 'layouts/admin/loginLayout',data:data})

    },
    login : (req,res,next)=>{

        let username =  req.input('username');
        let password = req.input('password');

        (async ()=>{

            let query = {username,password};
            try {
            
                await users.find(query).exec((err,userDoc)=>{

                        if(err){
                            throw new Error('Something went wrong, Try later')
                        }else{

                            console.log(userDoc)
                            
                            if(userDoc.length > 0){

                                res.send('ff') 

                            }else{

                                let data = {
                                    loginError : true,
                                    msg : 'Invalid Username or Password'
                                }

                            res.render('admin/login',{layout : 'layouts/admin/loginLayout',data:data})

                            }
                        }


                })
                
            } catch (error) {

                error.httpStatusCode = 500;
                next(error)

            }
            

        })()

    }
}