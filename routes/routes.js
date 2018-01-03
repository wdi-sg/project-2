const express = require('express')
const router = express.Router()

//Controllers
const homeController = require('../controllers/homeController.js')
const authController = require('../controllers/authController.js')

//Routes
router.get('/', homeController.home)
router.get('/positions',homeController.positions)
router.get('/summary', homeController.summary)

router.get('/users/login', authController.login)
router.get('/users/register', authController.register)



module.exports = router