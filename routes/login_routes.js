// require the model here
const User = require('../models/user')
const express = require('express')
const router = express.Router()

// need to require it again here, cos we need to use the passport strategies here
const passport = require('../config/ppConfig')

router.get('/', (req, res) => {
  // show the login form page
  // PITSTOP: when you're rendering, your POV is under `views`
  // no local data, cos we don't need to pass anything
  res.render('users/login')
})

// SPLIT RIGHT to `ppConfig.js` for better flow understanding
router.post('/', passport.authenticate('local', {
  successRedirect: '/', // the routes to go when it's successful
  failureRedirect: '/login' // the routes to go when it's not
}))

module.exports = router
