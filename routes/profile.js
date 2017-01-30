var express = require('express')
var router = express.Router()
var isLoggedin = require('../middleware/isLoggedin')
var profiles_controller = require('../controllers/profiles_controller')


router.get('/:id/dashboard', isLoggedin, profiles_controller.loadDashboard)

router.get('/view/:id', isLoggedin, profiles_controller.viewProfile)

router.get('/view/:id/dashboard', isLoggedin, profiles_controller.getDashboard)

router.get('/edit/:id', isLoggedin, profiles_controller.getProfile)

router.post('/edit/:id', isLoggedin, profiles_controller.editProfile)

router.post('/add/school', isLoggedin, profiles_controller.addSchool)

module.exports = router
