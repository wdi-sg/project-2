const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const InstagramStrategy = require('passport-instagram').Strategy

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
  })
  .exec(function (err, foundUser){
    if(err) {
      console.log('err', err)
      return next(err)
    }

    if (foundUser.validPassword(passportPassword)) {
      console.log('success, redirect to /profile')
      next(null, foundUser)
    }
  })
}

passport.use(new InstagramStrategy({
    clientID: 	'37222635b0644552ba1a1fe525108687',
    clientSecret: 'a0caafce5b364a05b8153ff37ed050c0',
    callbackURL: "http://localhost:4000/igcallback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ instagramId: profile.id }, function (err, user) {
      return done(err, user)
    })
  }
))

module.exports = passport
