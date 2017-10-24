const User = require('../models/user')
const express = require('express')
const router = express.Router()
const passport = require('../config/passport_config')

router.get('/', (req, res) => {
  res.render('users/login')
})

router.post('/', passport.authenticate('local', {
  successRedirect: '/', // the routes to go when it's successful
  failureRedirect: '/login' // the routes to go when it's not
}))

module.exports = router
