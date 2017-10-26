const express = require('express')
const router = express.Router()
const Stop = require('../models/stop')
const distance = require('../helpers/distance.js')
const app = require('../index.js')

router.get('/', (req, res) => {
  res.render('home')
})
router.post('/', (req, res) => {
  console.log('entered')
  // res.render('home', req.body)
  Stop.find()
    .then(stops => (findNearest(stops, req.body)))
    .then(nearest => {
      res.send({
        nearest
      })
    })
})
module.exports = router

var findNearest = (stops, loc) => {
  stops.sort(function compare(a, b) {
    if (distance(loc, a) < distance(loc, b)) {
      return -1;
    }
    if (distance(loc, a) > distance(loc, b)) {
      return 1;
    }
    return 0;
  })
  var stopDistArr = []
  for (var i = 0; i < 5; i++) {
    stopDistArr.push({
      stop: stops[i],
      dist: distance(loc, stops[i])
    })
  }
  console.log(stopDistArr);
  return stopDistArr
} //end findNearest
