const express = require('express')
const router = express.Router()

const passport = require('../helpers/ppInformation')
const isLoggedIn = require('../helpers/loginBlock')
const homeController = require('../controllers/homeController')
const authController = require('../controllers/authController')
const tripController = require('../controllers/tripController')
const locationController = require('../controllers/locationController')
const itineraryController = require('../controllers/itineraryController')

//==================== index ====================
router.get('/', homeController.index)

router.get('/home', isLoggedIn, homeController.home)

//==================== auth access ====================
router.get('/auth/login', authController.login)
router.post('/auth/login',
  passport.authenticate('local', { successRedirect: '/home',
                        failureRedirect: '/auth/login',
                        failureFlash: 'Invalid username and/or password',
                        successFlash: 'Logged in successfully'}))
router.get('/auth/register', authController.register)
router.post('/auth/register', authController.postRegister)
router.get('/auth/logout', authController.logout)

//==================== Trip Control ====================
router.get('/trip/new', isLoggedIn, tripController.new)
router.post('/trip/new', isLoggedIn, tripController.create)
router.get('/trip/main', isLoggedIn, tripController.main)
router.post('/trip/delete', isLoggedIn, tripController.delete)

//==================== Location Control ====================
router.post('/location/new', isLoggedIn, locationController.create)
router.get('/location/getAllForTrip', isLoggedIn, locationController.getAllForTrip)
router.post('/location/delete', isLoggedIn, locationController.delete)

//==================== Itinerary Control ====================
router.post('/itinerary/new', isLoggedIn, itineraryController.create)
router.post('/itinerary/delete', isLoggedIn, itineraryController.delete)

//==================== 404 ====================
router.get('*', authController.fourZeroFour)


module.exports = router
