const express = require('express')
const router = express.Router()
const request = require('request')


router.get('/flash', function (req, res) {
  res.send({
    'flash': req.flash('message')
  })
})
// Extension: /events
router.get('/', function (req, res) {
  res.render('contact/index')
})

module.exports = router
