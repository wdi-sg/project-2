const express = require('express')
const authController = require('../controllers/auth_controller')
const router = express.Router()

router.get('/login', authController.logIn)

router.post('/login', authController.loggedIn)

router.get('/logout', authController.logOut)

module.exports = router
