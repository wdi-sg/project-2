const express = require('express')
const router = express.Router()
const countryController = require('../controllers/country_controllers')

// router.post('/', function(req,res) {
//   res.send(req.body)
// })

router.post('/', countryController.search)
// router.post('/', countryController.show)

module.exports = router
