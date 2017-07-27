const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')

passport.serializeUser(function (user, next) {
  next(null, user.id)
})

passport.deserializeUser(function (id, next) {
  User.findById(id, function (err, user) {
    next(err, user)
  })
})

passport.use(
  new LocalStrategy(
    {
      usernameField: 'user[email]',
      passwordField: 'user[password]',
      passReqToCallback: true
    },
    localVerify
  )
)

function localVerify (req, passportEmail, passportPassword, next) {
  User
  .findOne({
    email: passportEmail
  }, function (err, foundUser) {
    if (err) {
      return next(err) // go to failureRedirect
    }

    if (!foundUser) {
      return next(null, false, {
        message: 'email exists'
      })
    }

    if (foundUser.validPassword(passportPassword)) {
          return next(null, foundUser) // go to successRedirect
    }
  })
}

module.exports = passport
