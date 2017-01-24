const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')

router.get('/signup', userController.getSignUp)

router.post('/signup', userController.postSignUp)

router.get('/login', userController.getLogIn)

router.post('/login', userController.postLogIn)

router.get('/logout', userController.getLogOut)

router.get('/:id/edit', userController.edit)

router.put('/:id', userController.update)

router.delete('/:id', userController.delete)

module.exports = router
