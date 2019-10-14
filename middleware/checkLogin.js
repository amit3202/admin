const {siteURL} = require('../helper/general')
module.exports = {
    checkLogin : (req,res,next)=>{

    
        if(req.session.username && req.session.activate == 'active'){
            next();
        }
        else{
            res.redirect(siteURL('/admin/login?refurl='+siteURL(req.originalUrl)))
        }
        
    
    },

    checkExistinglogin : (req,res,next)=>{

    
        if(req.session.username && req.session.activate == 'active'){
            res.redirect(siteURL('/admin/dashboard'))
        }
        next()
        
    
    }
}