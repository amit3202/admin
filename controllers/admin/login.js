var users = require('../../models/admin/users');
module.exports = {
    index: (req,res)=>{

        let data = {};
        if(req.session.renderData != undefined)
        {   data = {...req.session.renderData};
            delete(req.session.renderData);
        }
            
        res.render('admin/login',{layout : 'layouts/admin/loginLayout',data:data})

    }
}