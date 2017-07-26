const express = require('express')
const router = express.Router()
const request = require('request')
//const eventsController = require('../controllers/contactsController')

router.get('/flash', function (req, res) {
  res.send({
    'flash': req.flash('message')
  })
})
// Extension: /events
router.get('/', function (req, res) {
  res.render('contact/index')
})

// Extension: /events
//router.post('/', contactsController.create)

module.exports = router
