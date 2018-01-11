const express = require('express')
const router = express.Router()

const passport = require('../helpers/ppInformation')
const isLoggedIn = require('../helpers/loginBlock')
const HomeController = require('../controllers/homeController')
const AuthController = require('../controllers/authController')
const Announcement = require('../models/announcement')


// Main Page
// router.get('/', HomeController.index)

// Main / Tracker Page
router.get('/', HomeController.home)

router.post('/create', isLoggedIn, HomeController.create)
router.get('/edit/:id', isLoggedIn, HomeController.getedit)
router.post('/edit/:id', isLoggedIn, HomeController.postedit)
router.delete('/delete/:id', isLoggedIn, HomeController.delete)

// Login
router.get('/auth/login', AuthController.login)

// Twitter Login
router.get('/auth/twitter', passport.authenticate('twitter'))

router.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect : '/',
                                     failureRedirect : '/',
                                     successFlash : 'Welcome to the SMRT Delay Tracker!' }))

// Announcements Page
router.get('/announce', isLoggedIn, HomeController.announce)

// Logout
router.get('/auth/logout', AuthController.logout)

module.exports = router
