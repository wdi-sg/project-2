const express = require('express')
const homeRouter = express.Router()
//const homeController = require('../controllers/homeController')

homeRouter.get('/', function (req, res) {
  res.render('home/home')
})

module.exports = homeRouter
