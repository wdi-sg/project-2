const express = require('express')
const router = express.Router()
const validate = require('../controllers/valController.js')
const passport = require('../config/passport')
const usersController = require('../controllers/usersController')

//router.get('/new', usersController.register)
router.get('/profile', validate.notLoggedIn, usersController.list)

router.get('/new', function (req, res) {
  res.render('users/new')
})

router.get('/login', validate.alreadyLoggedIn, function (req, res) {
  res.render('users/login')
})


router.post('/login', usersController.login)

router.post('/new', usersController.create)



module.exports = router
