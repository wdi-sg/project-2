const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

const User = require('../models/user')
require('dotenv').config()

// Twitter Login Auth

passport.use(new TwitterStrategy({
  consumerKey : process.env.LOCAL_CONSUMER_KEY,
  consumerSecret : process.env.LOCAL_CONSUMER_SECRET,
  callbackURL : process.env.TWITTER_CALLBACK_URL_LOCAL
},
  function (token, tokenSecret, profile, done) {
    User.findOne({ 'twitterId': profile.id }, function (err, user) {
      if (err) {
        return done(err)
      }
      if (user) {
        return done(null, user)
      }
      else {
        var newUser = new User()
        newUser.twitterId = profile.id
        newUser.token = token
        newUser.username = profile.username
        newUser.displayName = profile.displayName
        newUser.save(function (err) {
          if (err) { throw err }
          return done(null, newUser)
        })
      }
    })
  }
))

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

module.exports = passport
