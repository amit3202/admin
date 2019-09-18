var users = require('../../models/admin/users');
module.exports = {
    index: (req,res)=>{

        res.render('admin/login',{layout : 'layouts/admin/loginLayout'})

    }
}