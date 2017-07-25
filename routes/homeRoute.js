const express = require('express')
const homeRouter = express.Router()
//const homeController = require('../controllers/homeController')

homeRouter.get('/', function (req, res) {
  if (req.user) {
  	res.render('home/home', {userDisplayName: req.user.name})  	
  }
  res.render('home/home')
})

module.exports = homeRouter
