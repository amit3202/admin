
const express = require('express');
const app = new express();
var dotenv = require('dotenv');
var session = require('express-session');

// Load Passport
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');


// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL:
        process.env.AUTH0_CALLBACK_URL || 'http://localhost:3202/callback'
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
      // accessToken is the token to call Auth0 API (not needed in the most cases)
      // extraParams.id_token has the JSON Web Token
      // profile has all the information from the user
      return done(null, profile);
    }
  );


var sess = {
    secret: Math.random(5000,1000),
    cookie: {},
    resave: false,
    saveUninitialized: true
}

app.use(session(sess));


passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());


dotenv.config();

app.get('/login',passport.authenticate('autho0',{
scope : 'openid email profile'
}),(req,res)=>{

res.redirec('/')

})

app.listen(process.env.PORT,(err)=>{

    if(err){
        console.log('Error in server : ' +err)
    }else{
        console.log('Server runnning on Port '+process.env.PORT)
    }

})