const express = require('express')
const router = express.Router()

const passport = require('../helpers/ppInformation')
const isLoggedIn = require('../helpers/loginBlock')
const HomeController = require('../controllers/homeController')
const AuthController = require('../controllers/authController')

// Main Page
router.get('/', HomeController.index)

// Tracker Page
router.get('/home', isLoggedIn, HomeController.home)

// Login
router.get('/auth/login', AuthController.login)
router.get('/auth/twitter', passport.authenticate('twitter'))

router.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/home',
                                     failureRedirect: '/' }));

// Logout
router.get('/auth/logout', AuthController.logout)

module.exports = router
