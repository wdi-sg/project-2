//require the model
const User =require('../models/user')
const express = require('express')
const router = express.Router()
const passport = require('../config/ppConfig');

router.get('/', (req, res) => {
  res.render('register')
})

router.post('/', (req, res)=>{
  var formData = req.body.user //QUESTION: why no need to require body-parser
  var newUser = new User({
    name: formData.name,
    email: formData.email,
    password: formData.password,
    phoneNumber: formData.phoneNumber
  })

  //TODO: can authenticate and auto login?
  newUser.save()
  .then(user => {
    passport.authenticate('local', {
      successRedirect: '/'
    })(req, res);
  },
  err => res.send(err) // error flow
)
})

module.exports = router
