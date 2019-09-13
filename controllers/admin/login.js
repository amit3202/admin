var users = require('../../models/admin/users');
module.exports = {
    index: (req,res)=>{

        users.findOne().exec((err,res)=>{

            console.log(res)

        })

        res.render('admin/login')

    }
}