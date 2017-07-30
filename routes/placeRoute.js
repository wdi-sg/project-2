const express = require('express')
const router = express.Router()

const placesController = require('../controllers/places_controller')

function authenticatedUser (req, res, next) {
  if (req.isAuthenticated()) return next()
  req.flash('message', 'Please login to access!')
  return req.session.save(function () {
    res.redirect('/users/login')
  })
}

router.get('/map', authenticatedUser, placesController.showMain)
router.get('/top', authenticatedUser, placesController.showTopPlaces)
router.get('/:tripid/:date', authenticatedUser, placesController.showTripOnMap)
router.post('/', placesController.createOrUpdate)
router.get('/:id', authenticatedUser, placesController.showOneOnMap)

module.exports = router
