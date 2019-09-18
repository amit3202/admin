var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({

    username : String,
    password : String,
    email : String,
    personal : {
        fullname : String,
        address : String,
        city : String,
        country : String
    },
    status : {
        type : String,
        enum : ['active','inactive'],
        default : 'active'
     },
    created_at : {
        type : Date,
        default : Date.now
    },
    deleted_at : {
        type : Date,
        default : null
    }
    
});

module.exports = mongoose.model('user',userSchema);
