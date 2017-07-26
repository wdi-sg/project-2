var express = require('express')
var router = express.Router()

const usersController = require('../controllers/users_controllers')

const carparksController = require('../controllers/carparks_controllers')

const passport = require('../config/passport')

router.get('/', function (req, res) {
  res.render('carparks/index', {
    user: req.user
  })
})

router.post('/', carparksController.create)

module.exports = router
