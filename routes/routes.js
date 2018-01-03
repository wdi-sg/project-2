const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home-controller');
const authController = require('../controllers/auth-controller');
const oracleController = require('../controllers/oracle-controller')

// Home
router.get('/', homeController.index);

// User Authentication
router.post('/signin', authController.signin)
router.post('/signup', authController.signup);
router.get('/signout', authController.signout);

// Divination
router.get('/consult', oracleController.consult);

module.exports = router;