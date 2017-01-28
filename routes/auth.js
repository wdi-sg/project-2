var express = require('express')
var router = express.Router()
var auth_controllers = require('../controllers/auth_controllers')
const passport = require('../config/ppConfig')


router.get('/signup', auth_controllers.loadSignUpForm)
router.post('/signup', auth_controllers.sendSignupForm)
router.post('/login', auth_controllers.login)
router.get('/logout', auth_controllers.logout)
