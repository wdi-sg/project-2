const express = require('express')
const userController = require('../controllers/user_controller')
const isLoggedIn = require('../middleware/isLoggedIn')
const router = express.Router()

router.get('/signup', userController.signup)

router.post('/signup', userController.create)

router.use(isLoggedIn)

router.get(`/:id`, userController.show)

router.get('/delete', userController.delete)

module.exports = router
