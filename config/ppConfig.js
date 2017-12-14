const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// need to require `User` model here, so we can access the db
const Customer = require('../models/customer')
const Admin = require('../models/admin')


passport.serializeUser((user, next) => {
  const userInfo = {
    id: user.id,
    type: user.type
  }
  next(null, userInfo)
})

passport.deserializeUser((userInfo, next) => {
  if (userInfo.type === 'customer') {
    Customer.findById(userInfo.id, function (err, user) {
      return next(err, user)
    })
  }
  if (userInfo.type === 'admin') {
    Admin.findById(userInfo.id, function (err, user) {
      return next(err, user)
    })
  }
})

passport.use(new LocalStrategy({
  usernameField: 'user[txtEmail]',
  passwordField: 'user[txtPassword]',
  passReqToCallback: true
}, function (req, email, password, next) {


  const Collection = req.body.user.type === 'admin' ? Admin : Customer

  Collection.findOne({email: email})
  .then(user => {


    if (!user) return next(null, false)

    user.validPassword(password, (err, isMatch) => {
      if (err) return next(err)
      if (isMatch) {
        return next(null, user)
      }
      return next(null, false, { message: 'mismatched'})
    })
  })
  .catch(err => next(err))
}))

module.exports = passport
