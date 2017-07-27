const express = require('express')
const router = express.Router()
const request = require('request')
const eventsController = require('../controllers/eventsController')

router.get('/', function (req, res) {
  res.render('events/index', {
    user: req.user
  })
})

router.post('/', eventsController.create)

module.exports = router
