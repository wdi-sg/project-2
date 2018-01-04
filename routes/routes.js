const express = require('express');
const router = express.Router();

const passport = require('../helpers/passportInfo');
const isLoggedIn = require('../helpers/loginBlock');

// controllers file
const homeController = require('../controllers/homeController.js');
const authController = require('../controllers/authController.js');
const userController = require('../controllers/userController.js');

// routes available without login
router.get('/', homeController.home);
router.post('/search', homeController.search);

// user authentication
router.get('/login', authController.login);
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    successFlash: 'Welcome!',
    failureFlash: true
  }));
router.get('/register', authController.register);
router.post('/register', authController.signup);
router.get('/logout', authController.logout);

// routes available with login
router.get('/profile/:id', isLoggedIn, userController.profile);
router.post('/profile/:id', isLoggedIn, userController.change);
router.get('/result/:id', isLoggedIn, userController.result);
router.delete('/delete/search/:id', isLoggedIn, userController.deleteSearch);
router.delete('/delete/analyzed/:id', isLoggedIn, userController.deleteAnalyzed);

module.exports = router;
