const express = require('express')
const homeRouter = express.Router()
const homeController = require('../controllers/homeController')

homeRouter.get('/', function (req, res) {
  
  // get user info
  
  if (req.user) {
  	res.render('home/home', {
  		userDisplayName: req.user.name, 
  		portMktVal: homeController.marketValue(req, res),
  		ETFList: homeController.fullListETF(req, res)
  	})
  } else {
  	res.render('home/home')  	
  }
})

module.exports = homeRouter
