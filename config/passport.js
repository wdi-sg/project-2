const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const InstagramStrategy = require('passport-instagram').Strategy
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

passport.use(new InstagramStrategy({
    clientID: 	'37222635b0644552ba1a1fe525108687',
    clientSecret: 'a0caafce5b364a05b8153ff37ed050c0',
    callbackURL: "http://localhost:4000/igcallback"
  },
  function(accessToken, refreshToken, profile, done) {
      User.findOrCreate({
        igId: profile.id,
        username: profile.username
      },
          function (err, result) {
              if(result) {
                  result.access_token = accessToken;
                  result.save(function(err, doc) {
                      done(err, doc);
                  })
              } else {
                  done(err, result)
              }
          }
      )
  }
))

module.exports = passport
