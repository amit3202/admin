var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var chatSchema = Schema({

    roomid : String,//mongoose.Schema.Types.ObjectId,
    sender_id : mongoose.Schema.Types.ObjectId,
    receiver_id : mongoose.Schema.Types.ObjectId,
    message : String,
    created_at : {
        type : Date,
        default : Date.now
    },
    deleted_at : {
        type : Date,
        default : null
    },
    read_at :  {
        type : Date,
        default : null
    }

})
module.exports = mongoose.model('chat',chatSchema)