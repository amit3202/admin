var mongoose = require('mongoose');
var {DBNAME} = require('../config/constant')
mongoose.connect(`mongodb+srv://schools:amit3202@schools-fu21x.mongodb.net/${DBNAME}?retryWrites=true&w=majority`, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
    }
);
mongoose.set('useCreateIndex', true)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  
    console.log('Database Connected')

});
module.exports = db;

