const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

passport.serializeUser((user, next) => {
  next(null, user.id)
})

passport.deserializeUser((id, next) => {
  User.findById(id, function (err, user) {
    next(err, user)
  })
})

passport.use(new LocalStrategy({
  usernameField: 'user[name]',
  passwordField: 'user[password]'
}, (name, password, next) => {
  User.findOne({name: name})
  .then(user => {
    if (!user) return next(null, false)
    user.validPassword(password, (err, isMatch) => {
      if (err) return next(err)
      if (isMatch) return next(null, user)
      return next(null, false, {message: 'Authentication failed'})
    })
  })
  .catch(err => next(err))
}))

module.exports = passport
