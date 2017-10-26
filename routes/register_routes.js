const express = require('express')
const router = express.Router()

const User = require('../models/user')
const passport = require('../config/ppConfig')

router.get('/', (req, res) => {
  res.render('register')
})

router.post('/', (req, res) => {
  var formData = req.body
  var newUser = new User({
    name: formData.name,
    email: formData.email,
    password: formData.password
  })

  newUser.save()
  .then(
    user => res.redirect(`/login`),
    err => res.send(err)
  )
})

module.exports = router
