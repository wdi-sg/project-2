const User = require('../models/user')
const express = require('express')
const router = express.Router()
const passport = require('../config/ppConfig')

router.delete('/:id', (req, res) => {

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
router.put('/:id', (req, res) => {

  var formData = req.body

  User.findByIdAndUpdate(req.params.id, {
    name: formData.name,
    email: formData.email,
    slug: formData.name.toLowerCase().split(' ').join('-')
  }, {new:true})
  .then((user) => res.redirect(`/profile/${user.slug}`))
  .catch(err => console.log(err))

})

module.exports = router
