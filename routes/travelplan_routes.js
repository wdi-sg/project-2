const Travelplan = require('../models/travel')
const express = require('express')
const router = express.Router()

router.get('/new-routes', (req, res) => {
  res.render('trips/new')
})











module.exports = router
