var mongoose = require('mongoose');
var {DBNAME} = require('../config/config')
mongoose.connect(`mongodb+srv://schools:aTQqFTjczPAsXLyr@schools-fu21x.mongodb.net/${DBNAME}?retryWrites=true&w=majority`, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  
    console.log('Database Connected')

});
module.exports = db;

