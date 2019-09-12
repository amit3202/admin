var mongoose = require('mongoose');
var {DBNAME} = require('../config/config')
mongoose.connect(`mongodb://127.0.0.1:27017/${DBNAME}`, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  
    console.log('Database Connected')

});
module.exports = db;

