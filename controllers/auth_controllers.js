const User = require('../models/User')
const passport =
require('../config/passport')

function register (req, res) {
  var newUser = new User({
    name: req.body.user.name,
    email: req.body.user.email,
    password: req.body.user.password
  })
  newUser.save(function (err, createdUser) {
    if (err) {
      return res.redirect('/register')
    } else {
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req, res)
    }
  })
}

function login (req, res) {
  // find the user by email
  User
  .findOne({
    email: req.body.user.email
  })
  .exec(function (err, foundUser) {
    if (err) return res.send(err)

    const formPassword = req.body.user.password

    if (foundUser.validPassword(formPassword)) {
      res.redirect('/')
    } else {
      res.render('/login')
    }
  })
}

module.exports = {
  register,
  login
}
