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

    res.redirect('/users/login')
  })
}

function show (req, res) {
  User
  .findOne({
    _id: req.params.id
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
  // console.log(req.params.id);
  Carpark.findOneAndRemove({
    _id: req.params.id
  }, function (err, foundCarpark) {
    if (err) console.log(err)
    res.redirect('/carparks')
  })
}

module.exports = {
  register,
  show,
  destroy
}
