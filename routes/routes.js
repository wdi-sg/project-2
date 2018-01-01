// const express = require('express')
// const router = express.Router()
//
// router.get('/', (req, res)=>{
//   res.send('idk does this work?')
// })
//
// module.exports = router
//
//
// const HomeController = require('../controllers/homeController')
//
// router.get('/', HomeController.index) //Home page
// router.get('/customers', HomeController.customers) //Customers page
// router.get('/stock', HomeController.stock) //Stocks page


//This works i guess//
const express = require('express')
const router = express.Router()

const homeController = require('../controllers/homeController')
const ItemController = require('../controllers/itemController')

 // these link to homecontroller.js and views/customers or views/home etc
router.get('/', homeController.index)
router.get('/customers', homeController.customers)
router.get('/stock', homeController.stock)

router.get('/items', ItemController.index) //Item page
router.get('/items/new', ItemController.new) //Item page


module.exports = router
