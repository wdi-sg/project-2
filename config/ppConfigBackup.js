const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/user")


passport.serializeUser(function(user,done){
  done(null,user.id)
})

passport.deserializeUser(function(id,done){

  User.findById(id, function(err,user){
    done(err,user)
  })
})

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, done){
  User.findOne({email: email}, function(err, user){
    if(err) return done(err)
    if (!user) return done(null, false)
    user.validPassword(password,  (err, isMatch) => {
      if (err) return done(null, false)
      if (isMatch) return done(null, user)
      return done(null, false, { message: 'passwords mismatch'})
    })

  })
}))

module.exports = passport
