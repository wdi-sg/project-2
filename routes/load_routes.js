const express = require('express')
const router = express.Router()
const Stop = require('../models/stop')
const BusService = require('../models/busService')
const request = require('request-promise-native')
const tptApiKey = process.env.APIKEY

//------------------------------Load the stops into DB, once--------------------------------------------//

//load stops in the db, each as new Stop
//todo; check if data already in system, skip 500. if count/length checked, stop getting data.
router.get('/stops', (req, res) => {
  var countStopAddedToDB = 0
  var loadStopsCount = 0

  while (loadStopsCount < 5000) {
    var options = {
      url: 'http://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip=' + loadStopsCount,
      headers: {
        'AccountKey': `${tptApiKey}`,
        'Content-Type': 'application/json'
      }
    }
    loadStopsCount += 500
    //make a request, with the above url and json format
    request(options)
      .then(json => {
        var data = JSON.parse(json)
        // res.send(data.value) //pass to loadStops_routes for populating in form.
        data.value.forEach(function(stop) {
          var newStop = new Stop({
            stopCode: stop.BusStopCode,
            road: stop.RoadName,
            description: stop.Description,
            longitude: stop.Longitude,
            latitude: stop.Latitude
          })
          newStop.save()
            .then(
              console.log('done'),
              err => res.send(err))
        }) //end foreeach - how to populate data.
        countStopAddedToDB += 500
        console.log(countStopAddedToDB, 'countStopAddedToDB');
      }) //end then json
  } //end while
})
//----------------------------------END----------------------------------------//


//-------------------------------------Phase 2 Use Only----------------//
//http://localhost:3000/load/serviceFromRoutes
//this gets all of the routes with services and stops available
router.get('/serviceFromRoutes', (req, res) => {
  var loadRouteCount = 0
  while (loadRouteCount < 24500) {
    loadRouteCount += 500
    var options = {
      url: 'http://datamall2.mytransport.sg/ltaodataservice/BusRoutes?$skip=' + loadRouteCount,
      headers: {
        'AccountKey': `${tptApiKey}`,
        'Content-Type': 'application/json'
      }
    }
    //make a request, with the above url and jsn format
    // request(options)
    //   .then(json => {
    //     var data = JSON.parse(json)
    //     res.send(data)
    //   })
    request(options)
      .then(json => {
        var data = JSON.parse(json)
        // var count = 0
        // copy relevant data from json - sevice # and stop. service will be repeated
        var refArray = []
        data.value.forEach(route =>
          refArray.push([route.ServiceNo, route.BusStopCode]))
        // console.log(refArray);
        var newRefArr = [] // create filtered data collapsed by service #
        var tempStopsArr = [refArray[0][0]]

        //start of loop
        for (var i = 0; i < refArray.length; i++) {
          if (!refArray[i + 1]) break
          if (refArray[i][0] !== refArray[i + 1][0]) {
            // tempStopsArr.push(refArray[i][0])
            tempStopsArr.push(refArray[i][1])
            newRefArr.push(tempStopsArr)
            tempStopsArr = [refArray[i + 1][0]]
          } else {
            tempStopsArr.push(refArray[i][1])
          }
        }
        // console.log(newRefArr);
        // newRefArr.forEach(service => console.log(service[0], service[1]))
        // newRefArr.forEach(service => console.log(service[0]," ", service.length))
        for (var i = 0; i < newRefArr.length; i++) {
          var stopsArr = newRefArr[i].splice(1)
          var newService = new BusService({
            busService: newRefArr[i][0],
            stops: stopsArr
          })
          newService.save()
            .then(
              console.log('done'),
              err => res.send(err))
        } //end for
      }) //end request
  } //end while
}) //end get

//removed router.get('/addBusToStops'...) as it is not used

module.exports = router
