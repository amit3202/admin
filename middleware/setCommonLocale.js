var menu = require('../models/admin/adminmenus')

const setCommonLocale = (req,res,next)=>{

    
    let stages = [
        
        {
            $match : {
                status : 'active',
                deleted_at : null
            }
        },
        {
            $lookup : {
                from: 'menus',
                localField: 'parent',
                foreignField: '_id',
                as: 'child',
            }
        },
        {
            $project : {
    
                title: 1,
                icon: 1,
                parent: 1,
                child: 1,
                childSize : {$size : "$child"}
            }
        },
        {
            $match : {
                childSize : {$gt:0}
            }
        }

    ]

    menu.aggregate(stages).exec((error,result)=>{

        
        
})
    

    next();

}

module.exports = setCommonLocale;