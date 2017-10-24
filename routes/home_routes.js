const express = require('express')
const router = express.Router()
const Stop = require('../models/stop')
const distance = require('../geoClosest.js')

router.get('/', (req, res) => {
  res.render('home')
})
router.post('/', (req, res) => {
  console.log('entered')
  console.log(req.body)
  // res.send(`you are at ${req.body} `)
  // var myLoc=  req.body
  // res.render('home', myLoc)
  Stop.find()
    .limit(499)
    .then(stops => (findNearest(stops, req.body)))
    .then(response => res.send(response))
  // .then(closestStop=>res.send(`find the nearest bus stops at ${closestStop} `))

  // put logic here...
  //show neearby stops. //route elsehwere to find, and get data, then render home to display
  // console.log('post resp found',req.body.latitude);
  // res.send(`find the nearest bus stops at ${req.body.latitude} & ${req.body.longitude}`)
})
module.exports = router

var findNearest = (stops, loc) => {
  var closest_distance = 100000
  var closestStop = stops[0]
  console.log(`close stop before loop ${closestStop}`);

  stops.forEach(stop => {
    if (distance(loc, stop) < distance(loc, closestStop)) {
      closest_distance = distance(loc, stop);
      closestStop = stop;
      console.log(`closest stop inside loop ${closestStop}`);
    }
  })
  console.log(closestStop);
  return closestStop
} //end findNearest
