var session = require('express-session');
const initSession = (server)=>{

    var sess = {
        secret: parseInt(Math.random(5000,1000)*10000).toString(),
        cookie: {secure: false},
        resave: false,
        saveUninitialized: true
    }

    server.use(session(sess))

}
module.exports = initSession;
