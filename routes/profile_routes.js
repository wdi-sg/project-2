const User = require('../models/user')
const express = require('express')
const router = express.Router()
const passport = require('../config/ppConfig')

router.delete('/:id', (req, res) => {
  // (AGAIN) thankfully since we're using mongoose
  // there's a method in mongoose just for that
  // `findByIdAndRemove` http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove

  User.findByIdAndRemove(req.params.id)
  .then(() => res.redirect(`/`))
  .catch(err => console.log(err))
  // after delete is done, redirect back to home page
  // (cos the current restaurant page is gone)
  // this redirection can go to anywhere as long as you have the routes with you
})

// UPDATE ONE
// pseudocode
// get the id from the url
// get the updated value from form
// find restaurant object by id given
// update with the input from form
// save to the db
router.put(`/profile/:slug`, (req, res) => {


  var formData = req.body

  User.findByIdAndUpdate(req.params.id, {
    name: formData.name,
    email: formData.email
  })
  .then(() => res.redirect(`/users/${req.params.id}`))
  .catch(err => console.log(err))
  
})
