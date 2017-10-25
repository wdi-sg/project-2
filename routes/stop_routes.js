const express = require('express')
const router = express.Router()
const Stop = require('../models/stop')
const BusService = require('../models/busService')
const request = require('request-promise-native')

router.get('/:code', (req, res) => {
BusService.find({stops:req.params.code})
.then(results => {
  console.log('we are here');
  console.log(results);
  // var abc = JSON.stringify(results)
  res.send(results)
}) //or .json?
.catch(err => console.log(err))
  // res.render('stop/:code') //need to create handlebar  ,{bus:bus}
})//end get
module.exports = router
// .then(results => {results.forEach(bus=>console.log(bus.busService))}) //includes)
