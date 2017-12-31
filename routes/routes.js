const express = require('express');
const router = express.Router();

// controllers file
const homeController = require('../controllers/homeController.js');
const authController = require('../controllers/authController.js');

// routes available without login
router.get('/', homeController.home);
router.post('/search', homeController.search);
router.get('/analyze', homeController.analyze);

// user authentication
router.get('/login', authController.login);
router.get('/register', authController.register);

module.exports = router;
