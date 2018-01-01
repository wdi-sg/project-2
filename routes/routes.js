const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
  res.send('idk does this work?')
})

module.exports = router


// // My simple learning //
// const express = require('express')
// const router = express.Router()
//
// const homeController = require('../controllers/homeController')
//
//  // these link to homecontroller.js and views/customers or views/home etc
// router.get('/', homeController.index)
// router.get('/customers', homeController.customers)
// router.get('/stock', homeController.stock)
//
//
// module.exports = router
