var mongoose =  require('mongoose');
const Schema = mongoose.Schema;
const menuSchema = Schema({
    
    title  : String,
    icon : {
        type : String,
        default : null
    },
    parent : {
        type : Schema.Types.ObjectId,
    },
    status : String,
    deleted_at : {
        type: Date,
        default : null
    }

})
module.exports = mongoose.model('menu',menuSchema);