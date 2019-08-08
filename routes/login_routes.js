const User = require('../models/user')
const express = require('express')
const router = express.Router()
const passport = require('../config/passport_config')

// LOGIN PAGE
router.get('/', (req, res) => {
  res.render('users/login')
})

// PASSPORT
router.post('/', passport.authenticate('local', {
  successRedirect: '/components/showall',
  failureRedirect: '/login'
}))

module.exports = router
