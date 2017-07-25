var express = require('express')
var router = express.Router()

const usersController = require('../controllers/users_controllers')

const carparksController = require('../controllers/carparks_controllers')

const passport = require('../config/passport')

router.get('/register', function (req, res) {
  res.render('users/new')
})

router.get('/login', function (req, res) {
  res.render('users/login')
})

router.get('/:username', usersController.show)

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)

router.post('/', carparksController.create)

router.post('/register', usersController.register)

router.delete('/:username', carparksController.destroy)

module.exports = router
