var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var {DBNAME} = require('../../config/constant')
const initSession = (server,db)=>{

    var sess = {
        secret: '123456789',
        cookie: {secure: false},
        resave: false,
        saveUninitialized: true,
        store : new MongoStore({
           // url : `mongodb+srv://schools:amit3202@schools-fu21x.mongodb.net/${DBNAME}?retryWrites=true&w=majority`
           mongooseConnection :db
        })
    }

    server.use(session(sess))

}
module.exports = initSession;
