var menu = require('../../models/admin/adminmenus');
var dummy = require('mongoose-dummy');
const ignoredFields = ['_id','__v'];
 module.exports = {

    generateDummyData :(req,res)=>{

        let randomObject = new menu(dummy(menu,{
            ignore : ignoredFields
        }))
        randomObject.save((err,resp)=>{
              res.send(resp);    
        })
        
    },

    getmenu : (req,res)=>{

            let aggregateStages = [];

            matchCondition = {
                $match : {
                    $and : [{'deleted_at' : null},{status:'1'}]
                }
            }
            aggregateStages.push(matchCondition);

            lookupCondition = {
                $lookup : {
                    from : 'menus',
                    localField : '_id',
                    foreignField : 'parent.parent_id',
                    as  : 'submenu'
                }
            }
             aggregateStages.push(lookupCondition);

            addFields = {
                $addFields : {
                    submenuLength : {$size : '$submenu'}
                }
            }
            aggregateStages.push(addFields);

            matchLength = {
                $match : {
                        $or : [
                                {   submenuLength : {$gt : 0} }, 
                                {   $and :[
                                    {'parent.type':1},
                                    {submenuLength : 0}
                                ]
                        }
                        ]
                }
            }
            aggregateStages.push(matchLength);

            unwindForSorting = {
                $unwind : {
                    path : '$submenu',
                    preserveNullAndEmptyArrays: true 
                }
            }
            aggregateStages.push(unwindForSorting);

             sortUnwindData = {
                $sort : {
                    'submenu.order' : -1
                }
            }
            aggregateStages.push(sortUnwindData);

             groupUnwind  = {
                $group : {
                    _id :{
                        
                        id:"$_id",
                        icon:"$icon",
                        title : '$title',
                        submenulength : '$submenuLength',
                        order : '$order'
                        },
                   
                    sbmenu:{$push:"$submenu"}

                }
            }
            aggregateStages.push(groupUnwind);

            sortStage  = {
                $sort : 
                    {'order' : -1}
            }
            aggregateStages.push(sortStage);


            menu.aggregate(aggregateStages).exec((err,result)=>{

                (err)?res.send({err:err}):res.send(result);
            })

    }

 }