var user = require('../models/admin/users');
var genHelper = require('../helper/general');
var compareAsc = require('date-fns/compareAsc');
module.exports = {

    validateAdminActivationEmail: (req,res) => {

        let email = req.input('encryptedemail')
        let code = req.input('validationcode')
        

       new Promise((resolve, reject) => {
        
            if (email != undefined && code != undefined) {

                email = genHelper.decryptString(email);
                let query = {'email':email ,'activation.code' : code}
                user.findOne(query).exec((err,docs)=>{

                    if(docs){

                        let status = docs.activation.status;
                        let validUpto = docs.activation.validUpto;
                        if(status == 'active'){
                            reject({error :'alreadyActive'})
                        }   
                        if(compareAsc(validUpto,new Date())< 0)
                        {
                            reject({error :'expire'})
                        }
                        
                        resolve(docs)
                    }
                    

                })


            }else{
                reject({ error: 'invalid' })
            }
            


        }).then((data) => {

            
            let query = {email : data.email}
            let updateObject =  {'activation.status':'active','activation.validOn':new Date()}

            user.updateOne(query,updateObject).exec((err,docs)=>{

                if(err){
                   throw new Error(err);
                }else{
                    res.redirect(genHelper.siteURL('validate/confirm/success'))
                }
                

            })

        }).catch((err) => {

            switch (err.error) {
                case 'invalid': {
                    res.redirect(genHelper.siteURL('validate/confirm/invalid'))
                    break;
                }
                case 'expire': {
                    res.redirect(genHelper.siteURL('validate/confirm/expire'))
                    break;
                }
                case 'alreadyActive': {
                    res.redirect(genHelper.siteURL('validate/confirm/alreadyActive'))
                    break;
                }
                default:
                        res.redirect(genHelper.siteURL('validate/confirm/wentWrong'))
                    break;
            }



        })

    },
    afterValidation : (req,res)=>{

        let reqtype = req.input('reqtype');
        res.locals.reqtype = reqtype;
        switch (reqtype) {
            case 'invalid': {
                res.render('common/emailActivation',{layout : 'layouts/errorLayout'})
                break;
            }
            case 'expire': {
               res.render('common/emailActivation',{layout : 'layouts/errorLayout'})
                break;
            }
            case 'alreadyActive': {
               res.render('common/emailActivation',{layout : 'layouts/errorLayout'})
                break;
            }
            case 'success': {
               res.render('common/emailActivation',{layout : 'layouts/errorLayout'})
                break;
            }
            default:
               res.render('common/emailActivation',{layout : 'layouts/errorLayout'})
                break;
        }


    }
}