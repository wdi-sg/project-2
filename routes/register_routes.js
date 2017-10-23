const User = require('../models/user')
const express = require('express')
const router = express.Router()
const passport = require('../config/ppConfig')

router.get('/', (req, res) => {
  res.render('register')
})

// router.post('/', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/failure'
// }))

module.exports = router
