const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

const usersController = require('../controllers/users_controller')

router.get('/login', function (req, res) {
  res.render('users/login', {
    flash: req.flash('message')
  })
})

router.get('/register', function (req, res) {
  res.render('users/register', {
    flash: req.flash('errors')
  })
})

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

router.post('/', usersController.register)
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router
