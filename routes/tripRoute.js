const express = require('express')
const router = express.Router()

const tripsController = require('../controllers/trips_controller')

router.get('/', tripsController.showMain)

router.get('/create', function (req, res) {
  res.render('trips/create', {
    user: req.user,
    flash: req.flash('message')
  })
})

router.get('/:id', tripsController.showSelected)

router.post('/', tripsController.create)

router.delete('/:id', tripsController.deleteSelected)

module.exports = router
