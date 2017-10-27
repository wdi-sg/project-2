const User = require('../models/user')
const express = require('express')
const router = express.Router()
const passport = require('../config/ppConfig')


router.get('/register', (req, res) => {
  res.render('users/register')
})

router.get('/login', (req, res) => {
  res.render('users/login')
})

router.post('/register', (req, res) => {
  var formData = req.body

  var newUser = new User({
    name: formData.user.name,
    email: formData.user.email,
    password: formData.user.password,
    mobile: formData.user.mobile
  })

  newUser.save()
  .then(
    user => res.redirect('/'),
    err => res.send(err)
  )
})

router.post('/login', passport.authenticate('user-local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router
