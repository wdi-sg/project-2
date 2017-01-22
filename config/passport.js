require('colors')
require('dotenv').config({silent: true})
let logging = process.env.LOGGING
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) return console.log(err)
    done(null, user)
  })
})

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  User.findOne({email:email}, (err, user) => {
    if (err) return done(err)
    if (user === null) {
      if (logging) console.log('TRIED TO LOG IN WITH AN EMAIL THAT DOES NOT EXIST'.red)
      return done(err, false, {message:'Tried to log in with an email that does not exist!'})
    } else if (user.validatePassword(password) === false ) {
      if (logging) console.log('TRIED TO LOG IN WITH AN INVALID PASSWORD'.red)
      return done(err, false, {message:'Tried to log in with an invalid password!'})
    } else {
      if (logging) console.log('USER LOGIN SUCCESSFUL: '.blue + user.name)
      return done(err, user)
    }
  })
}))

module.exports = passport