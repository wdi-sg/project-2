const passport = require('../config/ppConfig')
const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('user/register')
})

router.post('/', (req, res) => {
  const userData = req.body.user
  let newUser = new User({
    name : userData.name,
    email : userData.email,
    password : userData.password,
    //preferences : userData.preferences,
    // level : String,

  })


  newUser.save()
  .then(
    user => {
      passport.authenticate('local', {
        successRedirect : '/'
      }) (req, res)
    },
    err => res.send(err)
  )
})

module.exports = router
