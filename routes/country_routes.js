const express = require('express')
const router = express.Router()
const countryController = require('../controllers/country_controllers')

function authenticatedUser (req, res, next) {
  if (req.isAuthenticated()) return next()
  req.flash('message', 'Login to access!')
  res.redirect('/login')
}

router.post('/', authenticatedUser, countryController.search)

router.get('/:id', authenticatedUser, countryController.show)

module.exports = router
