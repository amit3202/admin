var passport = require('passport')
var OAuthStrategy = require('passport-auth0');
var dotenv = require('dotenv');
dotenv.config();

  
  const initPassport = (server)=>{

    var strategy = new OAuthStrategy(
        {
          domain: process.env.AUTH0_DOMAIN,
          clientID: process.env.AUTH0_CLIENT_ID,
          clientSecret: process.env.AUTH0_CLIENT_SECRET,
          callbackURL: process.env.AUTH0_CALLBACK_URL
        },
        function (accessToken, refreshToken, extraParams, profile, done) {
          // accessToken is the token to call Auth0 API (not needed in the most cases)
          // extraParams.id_token has the JSON Web Token
          // profile has all the information from the user
          return done(null, profile);
        }
      );
      
      passport.use(strategy);

      passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function (user, done) {
        done(null, user);
      });

      server.use(passport.initialize());
      server.use(passport.session());


  }

 

  module.exports = initPassport;