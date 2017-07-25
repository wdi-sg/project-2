const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  localVerify)
)

function localVerify (req, email, password, next) {
  User.findOne({
    email: req.body.email
  })
  .exec(function (err, foundUser) {
    if (err) next(err)
    const formPassword = req.body.password
    if (!foundUser.validPassword(formPassword)) {
      req.flash('message', 'Incorrect password, please try again.')
      next(null, false)
    }
    if (foundUser.validPassword(formPassword)) {
      next(null, foundUser)
    }
  })
}

module.exports = passport
