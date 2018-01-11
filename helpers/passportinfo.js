'use strict'

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user")

passport.serializeUser(function(user, done) {
  done(null, user.id);
});


passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },

  function(email, password, done) {
    User.findOne({ email: email }, function (error, user) {
        console.log(user)
      if (error) { return done(error); }

      if (!user) {
        return done(null, false, { error : 'Incorrect email.' });
      }

      if (!user.validPassword(password)) {
        return done(null, false, { error: 'Incorrect password.' });
      }

      return done(null, user);
    });
  }
))



// passport.use(new LocalStrategy((email, password, done) => {
//  User.getUserByEmail(email, (err, email) => {
//   if(err) throw err;
//   if(!email){
//     return done(null, false, {message: 'Incorrect Username/Email'});
//   }
//
//   User.comparePassword(password, user.password, (err, isMatch)=>{
//     if(err) return done(err);
//     if(isMatch){
//       return done(null, email);
//     } else {
//       return done(null, false, {message: 'Invalid Password'});
//     }
//   });
// })
// }));


module.exports = passport;
