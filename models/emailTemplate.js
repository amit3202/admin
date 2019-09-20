var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var emailSchema = new Schema({
    emailtype : String,
    template : String
});
module.exports = mongoose.model('emailTemplate',emailSchema);