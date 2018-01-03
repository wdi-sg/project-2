

//This works i guess//
const express = require('express')
const router = express.Router()

const homeController = require('../controllers/homeController')
const itemController = require('../controllers/itemController')

 // these link to homecontroller.js and views/customers or views/home etc
router.get('/', homeController.index)
router.get('/customers', homeController.customers)
router.get('/stock', homeController.stock)

router.get('/items', itemController.index) //Item page
router.get('/items/new', itemController.new) //Item page

router.post('/items/new', itemController.new) //Item page


module.exports = router
