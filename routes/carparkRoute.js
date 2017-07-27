var express = require('express')
var router = express.Router()

const carparksController = require('../controllers/carparks_controllers')

router.get('/', function (req, res) {
  res.render('carparks/index', {
    user: req.user
  })
})

router.post('/', carparksController.create)

module.exports = router
