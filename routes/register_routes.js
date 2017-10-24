// require the model here
const User = require('../models/user')

const express = require('express')
// this is to borrow the router fn of express
// not to start express server here
const router = express.Router()

// NEW ROUTE - REGISTER - to show the new user form
// but now inside a router page

// why '/', because all routes here is coming
// from /register anyway

router.get('/', (req, res) => {
  res.render('users/register')
})

// NEW ROUTE - POST NEW USER - to handle register form submission
router.post('/', (req, res) => {
  // UPDATE BEFORE CLASS 20 Oct
  var formData = req.body
  var newUser = new User({
    name: formData.name,
    // this name => slug => alex-min
    // hence, /profile/alex-min
    email: formData.email,
    password: formData.password // NOTICE, we're going to update this
  })

  newUser.save() // save the object that was created
  .then(
    user => res.redirect(`/profile/${user.slug}`),
    err => res.send(err)
  )
})

module.exports = router
