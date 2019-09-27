var user = require('../../models/admin/users');
var mailer = require('../../helper/mailer');
var cnt = require('../../config/constant');
var addDays = require('date-fns/addDays');
const {validationResult} = require('express-validator');
const genhelper = require('../../helper/general');
const _ = require('lodash');
module.exports = {
    index : (req,res,next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          
            let formatedErr = _.keyBy(errors.array(),'param');

            let renderData = {
                err : formatedErr,
                signuperror : true,
                'fullname':req.input('fullname'),
                'address':req.input('address'),
                'city' : req.input('city'),
                'country' : req.input('country'),
                'username': req.input('username'),
                'email':req.input('email'),
                'password' : req.input('password'),
                
            }
            req.session.renderData = renderData;
            res.redirect(genhelper.siteURL('admin/login'));
          
          }else{
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
                                err.httpStatusCode = 500
                                return next(err)
                            })
    
    
            }).then((data)=>{
    
                mailer(cnt.SIGNUPVERIFICATION,data);    
                return data;
                
            }).then((data)=>{
                
                res.render('common/activationemailSent',{layout : 'layouts/errorLayout',data})
    
            }).catch((data)=>{
    
                res.send(data)
            });
          }


        


    }
}