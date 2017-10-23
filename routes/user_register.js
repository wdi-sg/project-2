const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
  res.render('users/register')
})

// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login'
// }))

router.post('/', (req, res) => {
  var formData = req.body.user

  var newUser = new User({
    name: formData.name,
    email: formData.email,
    password: formData.password
  })
  newUser.save()
  .then(() => {
    res.redirect('/')
    // passport.authenticate('local', {
      // successRedirect: '/' })(req, res)
  },
  err => {
    console.log('err')
    res.redirect('users/register')
  })
})

module.exports = router
