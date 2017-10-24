const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function (email, password, done) {
  User.findOne({ email: email }, function (err, user) {
    if (err) return done(err)

    // If no user is found
    if (!user) return done(null, false)

    // Check if the password is correct
    if (!user.validPassword(password)) return done(null, false)

    return done(null, user)
  })
}))

// export the Passport configuration from this module
module.exports = passport
