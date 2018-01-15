var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user')

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

passport.use(new LocalStrategy({
  usernameField: 'user[username]', // this is from <input name="user[email]">
  passwordField: 'user[password]' // this is from <input name="user[password]">
}, (username, password, next) => {
 // update after class 23 oct, use `=>`, and `next`

  // update after 23 oct, we use then
  User.findOne({username: username})
  .then(user => {
    // if cannot find user, then we call `next()`
    if (!user) return next(null, false)

    // to easily understand this part, SPLIT with `user.js` line 50
    // `user.validPassword()` takes two argument. plainPassword and callback
    user.validPassword(password, (err, isMatch) => {
      if (err) return next(err)
      if (isMatch) return next(null, user)
      return next(null, false, { message: 'mismatched'})
    })
  })
  .catch(err => next(err))
}))

// export the Passport configuration from this module
module.exports = passport
