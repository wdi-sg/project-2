const express = require('express')
const router = express.Router()
const request = require('request')


router.get('/', function (req, res) {
  res.render('contact/index', {
    user: req.user
  })
})

module.exports = router
