var mongoose =  require('mongoose');
module.exports = mongoose.model('menus',new mongoose.Schema({

        title  : String,
        icon : {
            type : String,
            default : null
        },
        parent : {
            type : String,
            default : null
        },
        status : String,
        deleted_at : {
            type: Date,
            default : null
        }

}))