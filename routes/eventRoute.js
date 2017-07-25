const express = require('express')
const router = express.Router()
const request = require('request')
const eventsController = require('../controllers/eventsController')

router.get('/fash', function (req, res) {
  res.send({
    'flash': req.flash('message')
  })
})
// Extension: /events
router.get('/', function (req, res) {
  res.render('events/index')
})

// Extension: /events
router.post('/', eventsController.create)

module.exports = router
