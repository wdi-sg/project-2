const express = require('express')
const router = express.Router()

const placesController = require('../controllers/places_controller')

router.get('/map', placesController.showMain)
router.post('/', placesController.createOrUpdate)
router.get('/:id', placesController.showOneOnMap)

module.exports = router
