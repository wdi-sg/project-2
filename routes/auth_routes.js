var express = require('express')
var router = express.Router()
const authController = require('../controllers/auth_controllers')
const passport = require('../config/passport')

router.get('/register', function (req, res) {
  res.render('auth/signup')
})

router.get('/login', function (req, res) {
  res.render('auth/login')
})

router.post('/login',
  passport.authenticate('local', {
      sucessRedirect: '/profile',
      failureRedirect: '/register'
  }))

router.get('/fblogin', passport.authenticate('facebook'))

router.get('/fbcallback', passport.authenticate('facebook',
  {failureRedirect: '/register'}
),
  function (req, res) {
    res.send(req.user)
  }
)

router.post('/register', authController.register)

module.exports = router
