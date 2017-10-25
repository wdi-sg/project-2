const passport = require('../config/ppConfig')
const User = require('../models/user')
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('./users/register')
})

router.post('/', (req, res, next) => {
  var formData = req.body.user
  var newUser = new User({
    name: formData.name,
    password: formData.password
  })

  newUser.save()
  .then(
    user => {
      passport.authenticate('local', {
        successRedirect: `/profile/${user.name}`
      })(req, res, next)
    },
    err => res.send(err) // error flow
  )
})

module.exports = router
