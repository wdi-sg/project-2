const express = require('express')
const router = express.Router()
const Stop = require('../models/stop')
const distance = require('../geoClosest.js')
const app = require('../index.js')

router.get('/', (req, res) => {
  // var arr = [1, 2, 3]
  res.render('home')
})
router.post('/', (req, res) => {
  console.log('entered')
  // console.log(req.body)
  // var arr = [1, 2, 3]
  // res.send(`you are at ${req.body} `)
  // var myLoc=  req.body
  // res.render('home', myLoc)
  Stop.find()
    .then(stops => (findNearest(stops, req.body)))
    .then(nearest => {
      res.send({
        nearest
      })

      // app.locals.busstop = { nearest }
      // res.redirect('/')
      //   res.render('home', {
      //   // town: "Lee Vining",
      //   nearest
      // })
    })
  // .then(response => res.send(response))
  // .then(response => res.render('home',{response}))
  // .then(closestStop=>res.send(`find the nearest bus stops at ${closestStop} `))

  // put logic here...
  //show neearby stops. //route elsehwere to find, and get data, then render home to display
  // console.log('post resp found',req.body.latitude);
  // res.send(`find the nearest bus stops at ${req.body.latitude} & ${req.body.longitude}`)

})
module.exports = router

var findNearest = (stops, loc) => {

  //set up initial sorted distance array of 3.
  //refactored with sort function
// var closestArr = [stops[24], stops[1], stops[40]]
// closestArr.sort(function compare(a, b) {
stops.sort(function compare(a, b) {
  if (distance(loc, a)< distance(loc, b)) {
    return -1;
  }
  if (distance(loc, a)> distance(loc, b)) {
    return 1;
  }
  return 0;
})
// -----------------------------------
  // var closest_distance = 100000
  // var closestStop = stops[0]
  // var closestArr = [{stops[0],distance(loc, stops[0])}, stops[1], stops[2]]
  // var closestArr = []
  // if(distance(loc, stops[0])<distance(loc, stops[1])&&distance(loc, stops[0])<distance(loc, stops[2])){
  //   closestArr.push(stops[0])
  //   if(distance(loc,stops[1])<distance(loc,stops[2])){
  //     closestArr.push(stops[1])
  //     closestArr.push(stops[2])
  //   }else
  //   closestArr.push(stops[2])
  //   closestArr.push(stops[1])
  // }else if (distance(loc,stops[0])>distance(loc,stops[1])&&distance(loc,stops[0])<distance(loc,stops[2])) {
  //   closestArr.push(stops[1])
  //   closestArr.push(stops[0])
  //   closestArr.push(stops[2])
  // }else if(distance(loc,stops[0])>distance(loc,stops[1])&&distance(loc,stops[0])>distance(loc,stops[2])){
  //   if(distance(loc,stops[1])>distance(loc,stops[2])){
  //     closestArr.push(stops[2])
  //     closestArr.push(stops[1])
  //     closestArr.push(stops[0])
  //   }else{
  //     closestArr.push(stops[1])
  //     closestArr.push(stops[2])
  //     closestArr.push(stops[0])
  //   }
  // }else{
  //   closestArr.push(stops[2])
  //   closestArr.push(stops[0])
  //   closestArr.push(stops[1])
  // }
// -----------------------------------
//this is not totally accurate. needs to be sorted by dist.
  // var closestArr = [stops[0], stops[1], stops[2]] //sort these by dist.

// closestArr.forEach(stop=>{
//   console.log(distance(loc, stop), "m");
//   console.log(stop );
//   console.log(" " );
// })
//   // console.log(`close stop before loop ${closestArr}`);
//
//   stops.forEach(stop => {
//     var tempDist = distance(loc, stop)
//     // if(closestArr[0])
//     if (tempDist < distance(loc, closestArr[0])) {
//       // closest_distance = distance(loc, stop);
//       // closestStop = stop;
//       closestArr[0] = stop
//       // console.log(`closest stop inside loop ${closestArr[0]}`);
//       // console.log(`closest stop inside loop ${closestStop}`);
//     } else if (tempDist < distance(loc, closestArr[1])) {
//       closestArr[1] = stop
//       // console.log(`closest stop inside loop ${closestArr[0]}`);
//     } else if (tempDist < distance(loc, closestArr[2])) {
//       closestArr[2] = stop
//     } else {}
//   })
  // console.log(closestStop);
  // var nearest = closestArr
  var stopDistArr = []
  for (var i = 0; i < 5; i++) {
    stopDistArr.push({
      stop:stops[i],
      dist: distance(loc, stops[i])
    })
  }
  // var nearest = stops
  // var stopDistArr =
  // [ {stop:nearest[0], dist:distance(loc, nearest[0])},
  //   {stop:nearest[1], dist:distance(loc, nearest[1])},
  //   {stop:nearest[2], dist:distance(loc, nearest[2])}
  // ]
console.log(stopDistArr);

return stopDistArr
} //end findNearest
