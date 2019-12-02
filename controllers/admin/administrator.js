var administrators = require('../../models/admin/users');

module.exports = {
    list : async (req,res,next)=>{

        try {
            
            var users = await new Promise((resolve,reject)=>{

                administrators.find({
                    $and : [
                        {
                            deleted_at : null
                        }   
                    ]
                }).exec((err,result)=>{
        
                    if(err){
                        reject(err)
                    }else{
                        resolve(result);
                    }

                })
    
            })

        } catch (error) {
            
            error.httpStatusCode = 500;
            next(error)

        }

        var layoutData = {
            user
        }
        

        res.render('admin/administrators/list',{layout : 'layouts/admin/adminDefaultLayout'})

    }
}
