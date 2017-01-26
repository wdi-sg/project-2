const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth_controller')

router.get('/signup', authController.getSignUp)

router.post('/signup', authController.postSignUp)

router.get('/login', authController.getLogIn)

router.post('/login', authController.postLogIn)

router.get('/logout', authController.getLogOut)

router.get('/edit/:id', authController.edit)

router.put('/update/:id', authController.update)

router.put('/password/:id', authController.newPassword)
//
// router.delete('/:id', authController.delete)

module.exports = router
