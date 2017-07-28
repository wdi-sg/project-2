const User = require('../models/User')
const Event = require('../models/Event')
const passport = require('../config/passport')
const router = require('../routes/userRoute')
const request = require('request')

function list (req, res) {
  User.findOne({_id: req.user.id}).populate('events').exec(function (err, user) {
    if (err) res.send(err)

    res.render('profile', {
      user: user,
      flash: req.flash('message')
    })
  })
}

function create (req, res, next) {
  var newUser = new User({
    name: req.body.user.name,
    email: req.body.user.email,
    password: req.body.user.password
  })

  newUser.save(function (err, createdUser) {
    if (err) {
      flash: req.flash('message', 'bonjour!')
      return res.redirect('/users/profile')
    }
    passport.authenticate('local', {
      successRedirect: '/users/profile',
      failureRedirect: '/'
    })(req, res)
  })
}

function login (req, res) {
  passport.authenticate('local', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res)
}



module.exports = {
  create,
  login,
  list
}
