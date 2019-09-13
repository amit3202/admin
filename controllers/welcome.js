var user = require('../models/user');
module.exports = {
    index : (req,res)=>{

        // user.findOne().exec((err,res)=>{

        //     console.log(res)

        // })

        res.render('index')

    }
}