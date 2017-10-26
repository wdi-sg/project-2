const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('../config/ppConfig')
const Skill = require('../models/skills')

router.get('/', (req, res) => {
  Skill.find()
  .then(skills => {
    res.render('users/signup', {
      skills
    })
  })
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
    user => {
      passport.authenticate('local', {
        successRedirect: `/profile/${user.slug}/settings`
      })(req, res)
    },
    err => res.send(err)
  )
})

module.exports = router
