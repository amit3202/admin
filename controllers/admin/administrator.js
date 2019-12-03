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

        
        res.render('admin/administrators/list',{layout : 'layouts/admin/adminDefaultLayout'})

    },
    
    dataTabledata : (req,res)=>{

        administrators.find({
            deleted_at : null
            }).limit(5).sort({'created_at' : 1}).exec((err,users)=>{

                
                users.map((user)=>{
                    console.log(user)
                    // let userArray = []

                    // userArray.push('<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"><input name="id[]" type="checkbox" class="checkboxes" value="1"/><span></span></label>');
                    // userArray.push(user.username)

                    // return userArray;

                })

        })



        res.send('{"data" : [[1,2,3,4,5,6,7],[1,2,3,4,5,6,7]],"draw":1,"recordsTotal":178,"recordsFiltered":178}')

    }
}
