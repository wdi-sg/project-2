const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const usersController = require('../controllers/usersController')
const LoggedIn = require('../middleware/LoggedIn')
const notLoggedIn = require('../middleware/notLoggedIn')

router.get('/profile', LoggedIn, usersController.list)

router.get('/new', function (req, res) {
  res.render('users/new')
})

router.get('/login', notLoggedIn, function (req, res) {
  res.render('users/login', {
    message: req.flash('error')
  })
})


router.post('/login', usersController.login)

router.post('/new', usersController.create)

module.exports = router
