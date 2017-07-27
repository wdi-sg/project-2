const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const findOrCreate = require('mongoose-findorcreate')

const User = require('../models/User')

passport.serializeUser(function (user, next) {
  next(null, user.id)
})

passport.deserializeUser(function (id, next) {
  User.findById(id, function (err, user) {
    next(err, user)
  })
})

passport.use(new FacebookStrategy({
    clientID: 	'1664878330224291',
    clientSecret: 'bb435d0cf64335de37880912064a2bdd',
    callbackURL: "http://localhost:4000/fbcallback"
  },
  function(accessToken, refreshToken, profile, done) {
      User.findOrCreate({
        fbId: profile.id,
      },
          function (err, user) {
            return done(err, user)
          }
      )
  }
))

module.exports = passport
