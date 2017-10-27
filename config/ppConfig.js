const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const Partner = require('../models/partner')

passport.serializeUser((user, next) => {
  // if (user.type === 'user')
  console.log('testing user.email', user.id)
  next(null, user.id) // this user with specific id. has logged in before
})

passport.deserializeUser(function (id, next) {
  Partner.findById(id, function (err, user) {
    console.log('testingpartner', user)
  })
  console.log('huge test', Partner.findById(id, function (err, user){ return user}))
  User.findById(id, function (err, user) {
    console.log('testinguser', user)
  })
  User.findById(id, function (err, user) {
    console.log('testing user.email pt 2', user)
    next(err, user)
  })
})

passport.use('user-local', new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
},
(email, password, next) => {
  console.log('passport entered')
  User.findOne({email: email})
  .then(user => {
    console.log('found user')
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
