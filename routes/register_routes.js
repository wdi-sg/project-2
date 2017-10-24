//require the model
const User =require('../models/user')
const express = require('express')
const router = express.Router()

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

  newUser.save()
  .then(
    user => res.redirect('/profile'),
    err => res.send(err)
  )
})

module.exports = router
