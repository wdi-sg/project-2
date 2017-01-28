var express = require('express')
var router = express.Router()
var isLoggedin = require('../middleware/isLoggedin')
var profile_controllers = require('../controllers/profiles_controllers')



router.get('/profile/:id', isLoggedin, profile_controllers.getProfile)
router.get('/dashboard/:id', isLoggedin, profile_controllers.loadDashboard)
router.post('/profile/:id', isLoggedin, profile_controllers.editProfile)
