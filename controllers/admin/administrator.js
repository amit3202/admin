var administrators = require('../../models/admin/users');
var dummy = require('mongoose-dummy');
const ignoredFields = ['_id','__v','deleted_at'];
module.exports = {
    
    generateDummyData :(req,res)=>{

        let randomObject = new administrators(dummy(administrators,{
            ignore : ignoredFields
        }))
        randomObject.save((err,resp)=>{
              res.send(resp);    
        })
        
    }
    ,list : async (req,res,next)=>{

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
    
    dataTabledata :  (req,res,next)=>{
        
        try {
            
            async function queryBuilder() {

            
            var Query = administrators.find({
                deleted_at : null
                }).limit(5).sort({'created_at' : 1});

            
            var usertableData =  await new Promise((resolve,reject)=>{

                Query.exec((err,users)=>{
                        if(err){
                            reject(err);
                        }
                        
                       let usersData =  users.map((user)=>{
                            let userArray = [] 
                            userArray.push('<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"><input name="id[]" type="checkbox" class="checkboxes" value="1"/><span></span></label>');
                            userArray.push(user.username)
                            userArray.push(user.email)
                            userArray.push(user.personal.fullname)
                            userArray.push(user.activation.status)
                            userArray.push(user.created_at)
                            userArray.push('online')
                            userArray.push('view')
        
        
                            return userArray;
        
                        })
                        resolve(usersData)
        
                })

            })
            
            var filteredCount = await new Promise((resolve,reject)=>{

                Query.countDocuments((err,filteredCount)=>{
                    
                    if(err){
                        reject(err)
                    }else{
                        resolve(filteredCount)
                    }

                })
            })

            var totalCount = await new Promise((resolve,reject)=>{
                
                administrators.find({
                    deleted_at : null
                    })
                    .countDocuments((err,count)=>{
                        
                        if(err){
                            reject(err);
                        }
                        
                        resolve(count)
        
                })
            })

            return {
                usertableData,
                filteredCount,
                totalCount
            }
        }

             
              //Promise.all([usertableData,totalCount,filteredCount])
              queryBuilder().then((result)=>{
              console.log(result)
                var tableData = {
                    data : result.usertableData,
                    "draw":1,
                    "recordsTotal":result.totalCount,
                    "recordsFiltered":result.filteredCount    
                }
        
        
                res.send(tableData)
                

            }).catch((err)=>{
                throw new Error(err);
            })

        } catch (error) {
            res.send({'error':'something went wrong',err})
            console.log(error)

        }
        

    }
}
