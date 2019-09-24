var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var emailSchema = new Schema({
    emailtype : String,
    template : String,
    subject : String,
    from : String
});
module.exports = mongoose.model('emailtemplates',emailSchema);