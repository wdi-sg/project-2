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

  newUser.save()
  .then(
    user => {
      passport.authenticate('local', {
        successRedirect: '/'
      })(req, res);
    },
    err => res.send(err)
  )
})

module.exports = router
