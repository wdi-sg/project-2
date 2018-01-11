const express = require('express')
const router = express.Router()

const homeController = require('../controllers/homeController')
const itemController = require('../controllers/itemController')
const customerController = require('../controllers/customerController')


 // these link to homecontroller.js and views/customers or views/home etc
router.get('/', homeController.index)
// router.get('/items', homeController.items)
//this will change url, change in main.handlebars too


// ========== Customers ==========
router.get('/customers', customerController.index)
router.post('/customers', customerController.new)
router.get('/customers/:id', customerController.show)



// ========== Items ==========
router.get('/items', itemController.index) //Item page
router.post('/items', itemController.new) // item new post
router.post('/items', itemController.update)

// =========== Homepage ==========
router.post('/order', homeController.order)

module.exports = router
