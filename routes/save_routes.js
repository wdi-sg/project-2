const express = require('express')
const router = express.Router()
const Stop = require('../models/stop')
const BusService = require('../models/busService')
const request = require('request-promise-native')
const app = require('../index.js')

router.get('/stops/:code', (req, res) => {
  var busStop = req.params.code
  // console.log(app.locals.user)
  // console.log(req.user);
  // console.log(app.locals.user.id)
  // var id = app.locals.user.id
  // User.findById({})
  // User.findByIdAndUpdate(id, function (err, user) {
  //   console.log('found user.');
  //   //add the stop code to fav stops.
  //   next(err, user)
  // })
})
module.exports =router
