const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

//hashing cookie.
passport.serializeUser((user,next) => {
  console.log('serializeUser')
  next(null, user.id) //this user with specific id has logged in before.
})

//cookie to session. return hashed version of the session.
passport.deserializeUser((id, next) => {
  User.findById(id, function(err, user){
    console.log('deserializeUser')
    next(err, user)
  })
})

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, (email, password, next)=> {
  User.findOne({email: email})
    .then(user => {

    if (!user) return next(null, false)

    user.validPassword(password, (err, isMatch) => {
      if (err) return next(err)
      if (isMatch) {
        console.log('matched')
        return next(null, user)
      }
      return next(null, false, { message: 'mismatched'})
    })

  })
  .catch(err => next(err))
}))

module.exports = passport
