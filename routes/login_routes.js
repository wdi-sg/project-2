const passport = require('../config/ppConfig')
const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('user/login')
})

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}))

module.exports = router
