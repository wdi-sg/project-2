const passport = require('../config/ppConfig')
const User = require('../models/user')
const express = require('express')
const router = express.Router()
const userCode = process.env.USER_CODE

router.get('/', (req, res) => {
  res.render('users/register')
})

router.post('/', (req, res) => {
  var userData = req.body.user
  console.log(req.body)
  if (userData.code !== userCode) {
    return res.redirect('/register')
  }
  var newUser = new User({
    name: userData.name,
    email: userData.email,
    password: userData.password,
    type: 'admin'
  })

  newUser.save()
  .then(
    user => {
      console.log('save')
      passport.authenticate('local', {
        successRedirect: '/'
      })(req, res)
    },
    err => res.redirect('/register')
  )
})

module.exports = router
