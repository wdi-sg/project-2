const express = require('express')
const router = express.Router()
const Stop = require('../models/stop')
const BusService = require('../models/busService')
const request = require('request-promise-native')
const moment = require('moment');

router.get('/:code', (req, res) => {
  var busStop = req.params.code
  var options = {
    url: 'http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=' + busStop,
    headers: {
      'AccountKey': 'BF/zvVwHSeWjAnJVwSw0nQ==',
      'Content-Type': 'application/json'
    }
  }
//todo export arr with object bus svc # and arrival time
  request(options)
    .then(json => {
      var data = JSON.parse(json)
      // console.log(data);
      var arr = data.Services
      var buses = []
      for (var i = 0; i < arr.length; i++) {
        var str = arr[i].NextBus.EstimatedArrival
        var str2 = arr[i].NextBus2.EstimatedArrival
        var sub = str.substring(str.indexOf('T') + 1, str.indexOf('+'))
        var sub2 = str2.substring(str2.indexOf('T') + 1, str2.indexOf('+'))
        // console.log(sub)
        var diff = moment(sub, "h:mm:ss").fromNow()
        var diff2 = moment(sub2, "h:mm:ss").fromNow()
        // console.log(diff);
        var num = arr[i].ServiceNo
        buses.push({num , diff, diff2})
      }
      console.log(buses)
      res.render('stop', {
          // buses: data.Services //,
           buses: buses
        }) //send only service and time diff
      // res.send(data.Services)
    }).catch(err => console.log(err))
})

// router.get('/:code', (req, res) => {
// BusService.find({stops:req.params.code})
// .then(results => {
// res.render('stop',{buses:results})
//   // console.log('we are here');
//   // console.log(results);
//   // res.send(results)
// }) //or .json?
// .catch(err => console.log(err))
//   // res.render('stop/:code') //need to create handlebar  ,{bus:bus}
// })//end get
module.exports = router
// .then(results => {results.forEach(bus=>console.log(bus.busService))}) //includes)
