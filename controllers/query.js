var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Route=require('../models/route')
var Bus = require('../models/bus')
var BusStop = require('../models/busStop')
var passport = require('../config/ppConfig');
var http= require('http')
var isLoggedIn = require('../middleware/isLoggedIn');

var stops=[]
router.get('/', isLoggedIn, function(req, res) {
  console.log('inside GET /query');
  Route.find({user_id: req.user._id}, function(err,buses){
    if(err) console.log(error);
    if (buses.length > 0) {
      callbackFunc(buses)
    } else {
      res.render('home', {bus:buses})
    }
  })
  function callbackFunc(buses){
    stops=[]
    console.log(buses);
    for(let i=0;i<buses.length;i++){
    // buses.forEach(function(elem){
      BusStop.find({BusStopID: buses[i].BusStopID}, function(err, stop){
        if(err) console.log(err);
        console.log('calling callback view');
        callbackFuncView(buses, stop)
        console.log('stops after return is ', stops);
      })
    }

  }
  function callbackFuncView(buses, stop){
    console.log('stop is ', stop);
    console.log('stops is ', stops);
    stops.push(stop)
    if(stops.length===buses.length){
      res.render('home', {bus:buses, stop: stops})
    }
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
          AccountKey: process.env.LTA
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
          console.log('data acquired is ', data);
          resp.render('view',{body: body, stop: selectedRoute, busStop: selectedStop})
        })
      }).end();
    })

  })
})
//===============
//ajax
//=================

router.get('/search', function(req, res){
  Bus.find({ServiceNo: req.query.search}, function(err, bus){
    if(err) console.log(err);
    var StopArr=bus[0].BusStop
    var stopReturn=[]
    var length= StopArr.length
    StopArr.forEach(function(elem){
      BusStop.find({BusStopID: elem}, function(err, busStops){
        if(err) console.log(err);
        stopReturn.push(busStops)
        if(stopReturn.length===length){
          res.send(stopReturn)
        }
      })
    })
  })
});

//==============

router.get('/delete/:id',isLoggedIn, function(req,res){
  Route.findOneAndRemove({_id: req.params.id}, function(err, routes){
    if(err) console.log(err);
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
  })
})

// router.post('/dropdown', function(req,res){
//   var selectedBusStop=[]
//   console.log('req body', req.body);
//   Bus.findOne({ServiceNo: req.body}, function(err, bus){
//     console.log('bus ', bus);
//     bus.BusStop.forEach(function(elem){
//       BusStop.findOne({BusStopID: elem}, function(err, busstop){
//         selectedBusStop.push(busstop)
//         if(selectedBusStop.length===bus.BusStop.length){
//           res.JSON(selectedBusStop)
//         }
//       })
//     })
//   })
// })
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
  console.log("body is", req.body);
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
