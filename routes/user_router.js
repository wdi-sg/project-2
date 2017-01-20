const express = require('express')
const userController = require('../controllers/user_controller')
const router = express.Router()

router.get('/signup', userController.signup)

router.post('/signup', userController.create)

router.get('/profile', userController.index)

router.get('/delete', userController.delete)

module.exports = router
