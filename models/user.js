
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({

    username : String,
    password : String,
    email : String,
    personal : {
        firstName : String,
        lastName : String,
        address : String,
        dob : Date
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
        type : Date
    }
    
});

module.exports = mongoose.model('user',userSchema);
