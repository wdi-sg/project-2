const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
  res.render('users/signup')
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
    user => res.redirect(`/`),
    err => res.send(err)
  )
})

module.exports = router
