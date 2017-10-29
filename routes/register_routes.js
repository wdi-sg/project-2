const passport = require('../config/ppConfig')
const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('users/register', {
    title: 'Register'
  })
})

router.post('/', (req, res) => {
  var formData = req.body
  var newUser = new User({
    name: formData.user.name,
    email: formData.user.email,
    password: formData.user.password
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
