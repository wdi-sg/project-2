const express = require('express')
const homeRouter = express.Router()
const homeController = require('../controllers/homeController')

homeRouter.get('/', function (req, res) {
  
  // get user info
  
  if (req.user) {
    homeController.buildPage(req,res)
  } else {
  	res.redirect('./') // user not signed in; redirect to public Welcome page   	
  }
})

module.exports = homeRouter
