const User = require('../models/User')

function register (req, res) {
  var newUser = new User({
    name: req.body.user.name,
    email: req.body.user.email,
    password: req.body.user.password
  })

  newUser.save(function (err, createdUser) {
    if (err) {
      return res.send(err)
    }
    res.redirect('/')
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
