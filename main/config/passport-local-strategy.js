const passport = require("passport");

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user')
//authenticatio using passport
passport.use(new LocalStrategy({
  usernameField: 'email',
  passReqToCallback:true
},
  function ( req,email, password, done) {
    User.findOne({ email: email })
      .then(user => {
        if (!user || user.password !== password) {
          req.flash('error', 'ivalid username/password');
          return done(null, false);
        }
        return done(null, user);
      })
      .catch(err => {
        req.flash('error', 'error in signing in');
        return done(err);
      });
  }
));

// serialzing th euser to decide which key is to be kept in the cookies

passport.serializeUser(function (user, done) {
  done(null, user.id);
})

//deserialised the user from the key in thte cookies

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then(user => {
      if (!user) {
        console.log("User not found");
        return done(null, false); // Indicates failure, user not found
      }
      // User found, return the user object
      return done(null, user);
    })
    .catch(err => {
      console.error("Error in finding user:", err);
      return done(err);
    });
});


// check if the useer is authenticate
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains current sign in user
    res.locals.user = req.user;
  }
  next();
}
module.exports = passport;