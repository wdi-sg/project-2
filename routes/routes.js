const express = require('express')
const router = express.Router()

const homeController = require('../controllers/homeController')

//==================== index non auth access ====================
router.get('/', homeController.index)

module.exports = router
