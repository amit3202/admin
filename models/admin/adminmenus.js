var mongoose =  require('mongoose');
const Schema = mongoose.Schema;
const menuSchema = Schema({
    
    title  : String,
    icon : {
        type : String,
        default : null
    },
    parent : {
        type : {
            type : Number
        },
        parent_id : {
            type : mongoose.Schema.Types.ObjectId
        }
    },
    status : String,
    order : Number,
    deleted_at : {
        type: Date,
        default : null
    },
    link : String,
    created_at : {
        type: Date,
        default : Date.now
    }

})
module.exports = mongoose.model('menu',menuSchema);