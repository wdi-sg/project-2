const express = require('express')
const router = express.Router()
const Stop = require('../models/stop')
const BusService = require('../models/busService')
const request = require('request-promise-native')
const moment = require('moment');
const tptApiKey = process.env.APIKEY

router.get('/:code', (req, res) => {
  var busStop = req.params.code
  var options = {
    url: 'http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=' + busStop,
    headers: {
      'AccountKey': `${tptApiKey}`,
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
        //getting estimated arrival of each bus and the next one
        var str = arr[i].NextBus.EstimatedArrival
        var str2 = arr[i].NextBus2.EstimatedArrival
        //convert string to usable format
        var sub = str.substring(str.indexOf('T') + 1, str.indexOf('+'))
        var sub2 = str2.substring(str2.indexOf('T') + 1, str2.indexOf('+'))
        console.log(sub)
        console.log(sub2)
        //using moment package, get relative time that shows in arrival time in natural language
        var diff = moment(sub, "h:mm:ss").fromNow()
        var diff2 = moment(sub2, "h:mm:ss").fromNow()
        console.log(diff);
        console.log(diff2);
        var num = arr[i].ServiceNo
        console.log(num);
        buses.push({
          num, diff,diff2
        })
      }
      console.log(buses)
      res.render('stop', {
        buses: buses
      }) //send only service and time diff
      // res.send(data.Services)
    }).catch(err => console.log(err))
})
module.exports = router
