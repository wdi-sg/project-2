const User = require('../models/User')
const Carpark = require('../models/Carpark')

const request = require('request')

function register (req, res) {
  var newUser = new User({
    username: req.body.user.username,
    email: req.body.user.email,
    password: req.body.user.password
  })

  newUser.save(function (err, createdUser) {
    if (err) {
      return res.send(err)
    }

    res.redirect('/login')
  })
}

function show (req, res) {
  User
  .findOne({
    username: req.params.username
  })
  .populate('carparks')
  .exec(function (err, theUser) {
    if (err) res.send(err)
    // res.send(req.params.username)
    res.render('users/favourite', {
      user: theUser
    })
  })
}

function destroy (req, res) {
  // console.log(req.params)
  User.findOne({
    user: req.user.username
  },
  function (err, foundUser) {
    if (err) console.log(err)
    console.log(foundUser)
  })
    // res.send('destroyed')
  res.redirect('/:username')
    // console.log(req.params)
}

module.exports = {
  register,
  show,
  destroy
}
