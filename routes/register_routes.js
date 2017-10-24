const passport = require('../config/passport_config')
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
    res.redirect('/login')
  )
})

module.exports = router
