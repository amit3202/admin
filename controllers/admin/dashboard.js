var menu = require('../../models/admin/adminmenus');
const dashboard = {

    index : (req,res,next)=>{

        menu.save({

        title  : 'Dashboard',
        icon : 'fa-dash',
        //parent : ,
        status : 'active'
        

        }).exec((err,result)=>{

            console.log(err,result)

        })

         res.render('admin/dashboard',{layout : 'layouts/admin/adminDefaultLayout'})   

        }
    
}
module.exports = dashboard;