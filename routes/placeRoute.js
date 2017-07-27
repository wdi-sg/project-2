const express = require('express')
const router = express.Router()

const placesController = require('../controllers/places_controller')

router.get('/map', placesController.showMain)
router.get('/top', placesController.showTopPlaces)
router.get('/:tripid/:date', placesController.showTripOnMap)
router.post('/', placesController.createOrUpdate)
router.get('/:id', placesController.showOneOnMap)

module.exports = router
