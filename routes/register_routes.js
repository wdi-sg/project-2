const passport = require('../config/passport_config')
const User = require('../models/user')
const express = require('express')
const router = express.Router()
const adminCode = process.env.ADMIN_CODE

router.get('/', (req, res) => {
  res.render('users/register')
})

router.post('/', (req, res) => {
  var formData = req.body.user
  if (formData.code === adminCode) var adminStatus = true
  else adminStatus = false

  var newUser = new User({
    name: formData.name,
    email: formData.email,
    password: formData.password,
    isAdmin: adminStatus
  })

  newUser.save()
  .then(
    res.redirect('/login')
  )
})

module.exports = router
