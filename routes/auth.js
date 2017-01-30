const express = require('express')
const router = express.Router()
const auth_controllers = require('../controllers/auth_controllers')
const passport = require('../config/ppConfig')


router.get('/signup', auth_controllers.loadSignUpForm)

router.post('/signup', auth_controllers.sendSignUpForm)

router.post('/login', auth_controllers.login)

router.get('/logout', auth_controllers.logout)

module.exports = router
