const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const Partner = require('../models/partner')

passport.serializeUser((user, next) => {
  next(null, { id:user.id, type: user.type }) // this user with specific id. has logged in before
})

passport.deserializeUser(function (user, next) {
  if (user.type === 'user') {
    User.findById(user.id, function (err, user) {
      if (user) next(err, user)
    })
  }
  else {
    Partner.findById(user.id, function (err, user) {
      if (user) next(err, user)
    })
  }
})

passport.use('user-local', new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
  passReqToCallback: true
},
(req, email, password, next) => {
  console.log('passport entered')
  User.findOne({email: email})
  .then(user => {
    user.type = req.body.user.type
    if (!user) return next(null, false)
    user.validPassword(password, (err, isMatch) => {
      if (err) return next(err)
      if (isMatch) return next(null, user)
      console.log('mismatched')
      return next(null, false)
    })
  })
  .catch(err => next(err))
}))

passport.use('partner-local', new LocalStrategy({
  usernameField: 'partner[email]',
  passwordField: 'partner[password]'
},
(email, password, next) => {
  console.log('passport entered')
  Partner.findOne({email: email})
  .then(partner => {
    console.log('found partner')
    if (!partner) return next(null, false)
    partner.validPassword(password, (err, isMatch) => {
      if (err) return next(err)
      if (isMatch) return next(null, partner)
      console.log('mismatched')
      return next(null, false)
    })
  })
  .catch(err => next(err))
}))

module.exports = passport
