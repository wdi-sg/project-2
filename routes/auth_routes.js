const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth_controllers')
const passport =
require('../config/passport')

router.get('/register', function (req, res) {
  res.render('auth/signup')
})

router.get('/login', function (req, res) {
  res.render('auth/login')
})

router.post('/login',
 passport.authenticate('local', {
   successRedirect: '/profile',
   failureRedirect: '/register'
 }))

router.post('/register', authController.register)

module.exports = router
