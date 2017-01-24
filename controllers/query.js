var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Route=require('../models/route')
var passport = require('../config/ppConfig');
var http= require('http')
var isLoggedIn = require('./middleware/isLoggedIn');

router.get('/', isLoggedIn, function(req, res) {
  Route.find({user_id: req.user._id}, function(err,bus){
    if(err) console.log(error);
    callbackFunc(bus)
  })
  function callbackFunc(bus){
    console.log(bus);
    res.render('home', {bus:bus})
  }
});

router.get('/create', function(req, res) {
  Route.find({}, function(err,bus){
    if(err) console.log(error);
    callbackFunc(bus)
  })
  function callbackFunc(bus){
    console.log(bus);
    res.render('create', {bus:bus})
  }
  ;
});

router.post('/create', function(req,res){
  var busRoute = req.body.ServiceNo
  var busStop= req.body.BusStopID
  // console.log(busRoute);
  // console.log(busStop);
  var options = {
    host: 'datamall2.mytransport.sg',
    port: 80,
    path: '/ltaodataservice/BusArrival?BusStopID='+busStop+'&ServiceNo='+busRoute,
    method: 'GET',
    headers:{
      AccountKey: 'DPqLfU7ZRV6NRIvHv329kg=='
    }
  };

  http.request(options, function(res) {
    // console.log('STATUS: ' + res.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res.headers));
    // console.log(res);
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      var body = JSON.parse(chunk)
      // console.log('BODY: ' + chunk);
      // console.log(chunkChange[0]);
      Bus.create({
        ServiceNo: busRoute,
        BusStopID: busStop,
        user_id: req.user._id,
        EstimatedArrival: body.Services[0].NextBus.EstimatedArrival
      })
      console.log('Success');
    });
    successRedirect: 'home'
  }).end();

})



// router.post('/signup', function(req, res) {
//   User.create({
//     email: req.body.email,
//     name: req.body.name,
//     password: req.body.password
//   }, function(err, createdUser) {
//     if(err){
//       req.flash('error', 'Could not create user account');
//       res.redirect('/auth/signup');
//     } else {
//       passport.authenticate('local', {
//         successRedirect: '/todos',
//         successFlash: 'Account created and logged in'
//       })(req, res);
//     }
//   });
// });
// router.get('/signup', function(req, res) {
//   res.render('auth/signup');
// });
//
// router.get('/login', function(req, res) {
//   res.render('auth/login');
// });
//
//
//
// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/todos',
//   failureRedirect: '/auth/login',
//   failureFlash: 'Invalid username and/or password',
//   successFlash: 'You have logged in'
// }));
//
// router.get('/logout', function(req, res) {
//   req.logout();
//   req.flash('success', 'You have logged out');
//   res.redirect('/');
// });

module.exports = router;
