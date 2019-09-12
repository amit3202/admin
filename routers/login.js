var welcome = require('../controllers/welcome');
var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/login',passport.authenticate('auth0',{
    scope : 'openid email profile'
}),welcome.index);

router.get('/logout',(req,res)=>{

  req.logout();
  res.redirect('/');

});

router.get('/callback', function (req, res, next) {
    passport.authenticate('auth0', function (err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        const returnTo = req.session.returnTo;
        delete req.session.returnTo;
        res.redirect(returnTo || '/api/v1/user');
      });
    })(req, res, next);
  });

module.exports = router;




