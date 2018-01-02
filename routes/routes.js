const express = require('express');
const router = express.Router();

// controllers file
const homeController = require('../controllers/homeController.js');
const authController = require('../controllers/authController.js');
const userController = require('../controllers/userController.js');

// routes available without login
router.get('/', homeController.home);
router.post('/search', homeController.search);

// user authentication
router.get('/login', authController.login);
router.post('/login', authController.user);
router.get('/register', authController.register);
router.post('/register', authController.user);

// routes available with login
router.get('/profile', userController.access);
router.get('/profile/:id', userController.profile);
router.get('/result', userController.result);

module.exports = router;
