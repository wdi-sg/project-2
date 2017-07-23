const express = require('express')
const usersRouter = express.Router()
//const usersController = require('../controllers/usersController')

usersRouter.get('/', function (req, res) {
  res.render('signUp')
})

usersRouter.get('/signIn', function (req, res) {
  res.render('users/signIn')
})

usersRouter.get('/signUp', function (req, res) {
  res.render('users/signUp')
})


module.exports = usersRouter
