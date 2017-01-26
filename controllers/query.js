var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Route=require('../models/route')
var Bus = require('../models/bus')
var BusStop = require('../models/busStop')
var passport = require('../config/ppConfig');
var http= require('http')
var isLoggedIn = require('../middleware/isLoggedIn');

// router.get('/', isLoggedIn, function(req, res) {
//   Route.find({user_id: req.user._id}, function(err,bus){
//     if(err) console.log(error);
//     callbackFunc(bus)
//   })
//   function callbackFunc(bus){
//     console.log(bus);
//     var stops=[]
//     bus.forEach(function(elem){
//       BusStop.find({BusStopID: elem.BusStopID}, function(err, stop){
//         if(err) console.log(err);
//         console.log('bus stops found: ',stop)
//         stops.push(stop)
//       })
//     })
//     console.log('stops are: ', stops);
//     callbackFuncView(bus, stops)
//   }
//   function callbackFuncView(bus, stop){
//     res.render('home', {bus:bus, stop: stop})
//   }
// });
var stops=[]
router.get('/', isLoggedIn, function(req, res) {
  Route.find({user_id: req.user._id}, function(err,bus){
    if(err) console.log(error);
    callbackFunc(bus)
  })
  function callbackFunc(bus){
    console.log(bus);
    bus.forEach(function(elem){
      BusStop.find({BusStopID: elem.BusStopID}, function(err, stop){
        if(err) console.log(err);
        console.log('calling callback view');
        callbackFuncView(bus, stop)
        console.log('stops after return is ', stops);
      })
    })
    res.render('home', {bus:bus, stop: stops})
  }
  function callbackFuncView(bus, stop){
    console.log('stop is ', stop);
    console.log('stops is ', stops);
     return stops.push(stop)
  }
});

router.get('/view/:id', isLoggedIn, function(req, resp) {
  console.log('entered into get');
  Route.findById(req.params.id, function(err,selectedRoute){
    console.log('selected route is '+ selectedRoute);
    if(err) console.log(error);
    BusStop.find({BusStopID:selectedRoute.BusStopID }, function(err, selectedStop){
      if(err)console.log(err);
      var options = {
        host: 'datamall2.mytransport.sg',
        port: 80,
        path: '/ltaodataservice/BusArrival?BusStopID='+selectedRoute.BusStopID+'&ServiceNo='+selectedRoute.ServiceNo+'&SST=True',
        method: 'GET',
        headers:{
          AccountKey: 'DPqLfU7ZRV6NRIvHv329kg=='
        }
      };
      console.log('options is '+ options);

      http.request(options, function(res) {
        res.setEncoding('utf8');
        var data=''
        res.on('data', function (chunk) {
          data+=chunk
        })
        res.on('end', function(){
          var body = JSON.parse(data)
          resp.render('view',{body: body, stop: selectedRoute, busStop: selectedStop})
        })
      }).end();
    })

  })
})

router.get('/delete/:id',isLoggedIn, function(req,res){
  Route.findOneAndRemove({_id: req.params.id}, function(err, routes){
    if(err) console.log(err);
    Route.find({user_id: req.user._id}, function(err,bus){
      if(err) console.log(error);
      callbackFunc(bus)
    })
    function callbackFunc(bus){
      console.log(bus);
      res.render('home', {bus:bus})
    }
  })
})


router.get('/create', function(req, res) {
  var busList
  var stopList
  Bus.find({}, function(err,bus){
    if(err) console.log(error);
    callbackFunc(bus)
  })
  function callbackFunc(bus){
    //console.log(bus);
    busList=bus
    BusStop.find({}, function(err,stop){
      if(err) console.log(error);
      callbackFunc1(stop)
    })
  };

  function callbackFunc1(stop){
    stopList=stop
    res.render('create', {bus:busList, stop: stopList })
  };

});

router.post('/create', function(req,res){
  var busRoute = req.body.ServiceNo
  var busStop= req.body.BusStopID
  console.log(busRoute);
  console.log(busStop);
      Route.create({
        ServiceNo: busRoute,
        BusStopID: busStop,
        user_id: req.user._id
      })
      res.redirect('/query/')
})
module.exports = router;
