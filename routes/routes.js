const express = require('express')
const router = express.Router()

const passport = require('../helpers/ppInformation')
const isLoggedIn = require('../helpers/loginBlock')

//Controllers
const homeController = require('../controllers/homeController.js')
const authController = require('../controllers/authController.js')

//Routes
router.get('/', homeController.home)
router.get('/positions',homeController.positions)
router.get('/summary', homeController.summary)

router.get('/users/login', authController.login)
router.get('/users/register', authController.register)

//To create positions
router.post('/positions/new',homeController.create)

//  authentication
router.get('/login', authController.login)
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    successFlash: 'Welcome!',
    failureFlash: true
  }))
router.get('/register', authController.register)
router.post('/register', authController.signup)
// router.get('/logout', authController.logout)



module.exports = router
