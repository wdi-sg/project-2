const express = require('express')
const router = express.Router()

const passport = require('../helpers/ppInformation')
const isLoggedIn = require('../helpers/loginBlock')
const homeController = require('../controllers/homeController')
const authController = require('../controllers/authController')
const tripController = require('../controllers/tripController')

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

//==================== 404 ====================
router.get('*', authController.fourZeroFour)


module.exports = router
