const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

// it will store into the session, currently logged in user
// when success => next(null, foundUser)
passport.serializeUser(function (user, next) {
  next(null, user.id)
})

// it will open the session, and convert id stored in session into the actual user object, accessible in req.user
passport.deserializeUser(function (id, next) {
  User.findById(id, function (err, user) {
    next(err, user)
  })
})

// local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'user[username]',
      passwordField: 'user[password]',
      passReqToCallback: true
    },
    localVerify
  )
)

function localVerify (req, passportUsername, passportPassword, next) {
  User
  .findOne({
    username: passportUsername
  })
  .exec(function (err, foundUser) {
    if (err) return next(err) // go to failureRedirect
    if (!foundUser.validPassword(passportPassword)) {
      req.flash('message', 'Invalid password/ username')
      return next(null, false)
    }
    if (foundUser.validPassword(passportPassword)) {
      next(null, foundUser) // go to successRedirect
    }
  })
}

module.exports = passport
