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
      req.flash('errors', err.message)
      return req.session.save(function () {
        res.redirect('/users/register')
      })
    }
    req.flash('message', 'new account created, please log in')
    return req.session.save(function () {
      res.redirect('/users/login')
    })
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
    res.render('users/favourite', {
      user: theUser
    })
  })
}

function destroy (req, res) {
  User.findOne({
    _id: req.user.id
  }, function (err, foundUser) {
    if (err) res.send(err)
    var index = foundUser.carparks.indexOf(req.params.id)
    if (index > -1) {
      foundUser.carparks.splice(index, 1)
      foundUser.save()
    }
  })
  Carpark.findOneAndRemove({
    _id: req.params.id
  }, function (err, foundCarpark) {
    if (err) console.log(err)
    res.redirect(`/users/${req.user.id}`)
  })
}

module.exports = {
  register,
  show,
  destroy
}
