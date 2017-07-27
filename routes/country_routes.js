const express = require('express')
const router = express.Router()
const countryController = require('../controllers/country_controllers')

router.post('/', countryController.search)

router.put('/', countryController.update)

module.exports = router
