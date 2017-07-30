const express = require('express')
const router = express.Router()

const tripsController = require('../controllers/trips_controller')

function authenticatedUser (req, res, next) {
  if (req.isAuthenticated()) return next()
  req.flash('message', 'Please login to access!')
  return req.session.save(function () {
    res.redirect('/users/login')
  })
}

router.get('/', authenticatedUser, tripsController.showMain)

// router.get('/place', tripsController.checkIfPlaceAlreadyAdded)

router.get('/create', authenticatedUser, function (req, res) {
  res.render('trips/create', {
    user: req.user,
    flash: req.flash('message')
  })
})

router.get('/:id', authenticatedUser, tripsController.showSelected)

router.post('/', tripsController.create)

router.delete('/:id', tripsController.deleteSelected)

router.put('/:id', tripsController.removePlaceFromTrip)

module.exports = router
