var isLoggedIn = require('./middleware/isLoggedIn');
var express = require('express');
// var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var app = express();
var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var service= require('./models/busService')
var stop= require('./models/busStop')
var http=require('http')


require('dotenv').config({ silent: true })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
if (process.env.NODE_ENV === "test") {
mongoose.connect('mongodb://localhost/express-authentication')
} else {
  mongoose.connect('mongodb://localhost/project2')
}
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(ejsLayouts);
/*
 * Include the flash module by calling it within app.use().
 * IMPORTANT: This MUST go after the session module
 */


app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', function(req, res) {
  res.render('profile');
});

app.use('/auth', require('./controllers/auth'));
app.use('/query', require('./controllers/query'))

// var options = {
//     host: 'datamall2.mytransport.sg',
//     port: 80,
//     path: '/ltaodataservice/BusRoutes?$skip=1000',
//     method: 'GET',
//     headers:{
//       AccountKey: 'DPqLfU7ZRV6NRIvHv329kg=='
//     }
//   };
//
//   http.request(options, function(res) {
//     // console.log('STATUS: ' + res.statusCode);
//     // console.log('HEADERS: ' + JSON.stringify(res.headers));
//     // console.log(res);
//     res.setEncoding('utf8');
//     res.on('data', function (chunk) {
//       var body = JSON.parse(chunk)
//       // console.log('BODY: ' + chunk);
//       // console.log(chunkChange[0]);
//       for(var i=0;i<body.value.length;i++){
//       service.create({
//         ServiceNo: body.value[i].ServiceNo
//       })
//     }
//       console.log('Success');
//     });
//   }).end();

  // var options1 = {
  //     host: 'datamall2.mytransport.sg',
  //     port: 80,
  //     path: '/ltaodataservice/BusStops',
  //     method: 'GET',
  //     headers:{
  //       AccountKey: 'DPqLfU7ZRV6NRIvHv329kg=='
  //     }
  //   };
  //
  //   http.request(options1, function(res) {
  //     // console.log('STATUS: ' + res.statusCode);
  //     // console.log('HEADERS: ' + JSON.stringify(res.headers));
  //     // console.log(res);
  //     res.setEncoding('utf8');
  //     res.on('data', function (chunk) {
  //       var body = JSON.parse(chunk)
  //       // console.log('BODY: ' + chunk);
  //       // console.log(chunkChange[0]);
  //       for(var i=0;i<body.value.length;i++){
  //       stop.create({
  //         BusStopId:body.value[i].BusStopCode,
  //         RoadName: body.value[i].RoadName,
  //         Description: body.value[i].Description,
  //         Latitude: body.value[i].Latitude,
  //         Longitude: body.value[i].Longitude,
  //         BusServices: []
  //       })
  //     }
  //       console.log('Success');
  //     });
  //   }).end();

var server = app.listen(process.env.PORT || 3000);

module.exports = server;

//
