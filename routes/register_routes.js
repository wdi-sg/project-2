const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('register')
})

router.post('/', (req, res) => {
  var formData = req.body.user
  var newUser = new User({
    name: formData.name,
    email: formData.email,
    password: formData.password,
    day: formData.day,
    month: formData.month,
    year: formData.year
  })

  newUser.save()
  .then(
    user => res.redirect(`/profile/${user.slug}`),
    err => res.send(err)
  )
})

module.exports = router
