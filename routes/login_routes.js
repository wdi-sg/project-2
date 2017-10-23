const User = require('../models/user')
const express = require('express')
const router = express.Router()
const passport = require('../config/ppConfig')

router.get('/', (req, res) => {
  // show the login form page
  // PITSTOP: when you're rendering, your POV is under `views`
  // no local data, cos we don't need to pass anything
  res.render('users/login')
})

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/failure'
}))

module.exports = router
