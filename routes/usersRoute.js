const express = require('express')
const usersRouter = express.Router()
//const usersController = require('../controllers/usersController')

usersRouter.get('/', function (req, res) {
  res.render('signUp')
})

module.exports = usersRouter
