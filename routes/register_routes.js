// require the model here
const passport = require('../config/ppConfig')
const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('users/register')
})

router.post('/', (req, res) => {
  var formData = req.body.user

  var newUser = new User({
    name: formData.name,
    email: formData.email,
    password: formData.password
  })

  newUser.save() // save the object that was created
  .then(
    user => {
      passport.authenticate('local', {
        successRedirect: '/'
      })(req, res);
    },
    // success flow, redirect to profile page
    err => res.send(err) // error flow
  )
})

module.exports = router
