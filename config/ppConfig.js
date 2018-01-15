const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/user")

passport.serializeUser((user, next) => {
  console.log("serializeUser")
  next(null, user.id)
})

passport.deserializeUser((id, next) => {
  console.log("deserializeUser")
  User.findById(id, function(err, user) {
    next(err, user)
  })
})

passport.use(
  new LocalStrategy(
    {
      usernameField: "user[name]",
      passwordField: "user[password]"
    },
    (name, password, next) => {
      console.log("local")
      User.findOne({ name: name })
        .then(user => {
          if (!user) return next(null, false)
          user.validPassword(password, (err, isMatch) => {
            if (err) return next(err)
            if (isMatch) return next(null, user)
            return next(null, false, { message: "Authentication failed" })
          })
        })
        .catch(err => next(err))
    }
  )
)

module.exports = passport
