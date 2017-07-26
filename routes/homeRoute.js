const express = require('express')
const homeRouter = express.Router()
const homeController = require('../controllers/homeController')

homeRouter.get('/', function (req, res) {
  if (req.user) {
    homeController.buildPage(req,res)
  } else {
  	res.redirect('./') // user not signed in; redirect to public Welcome page   	
  }
})

homeRouter.post('/', function (req, res) {
  if (req.user) {
  	console.log('in homeRouter.post: ', req.body)
    homeController.addPosition(req, res)
    //homeController.buildPage(req,res)
  } else {
  	res.redirect('./') // user not signed in; redirect to public Welcome page   	
  }
})

module.exports = homeRouter
