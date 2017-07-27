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
      usernameField: 'user[email]',
      passwordField: 'user[password]',
      passReqToCallback: true
    },
    localVerify
  )
)

// verify callback for local strategy
function localVerify (req, passportEmail, passportPassword, next) {
  console.log(req.body)
  console.log(passportEmail)
  console.log(passportPassword)
  User
  .findOne({
    email: passportEmail
  }, function (err, foundUser) {
    if (err) {

      console.log('err', err)
      return next(err) // go to failureRedirect
    }

    if (!foundUser) {
      console.log('user not found')
      return next(null, false, {
        message: 'email exists'
      })
    }
    console.log('fondUser', foundUser)
    console.log('err', err)
    console.log('hello')
    if (foundUser.validPassword(passportPassword)) {
      console.log('success, redirect to /profile')
      return next(null, foundUser) // go to successRedirect
    }
  })
}

module.exports = passport
