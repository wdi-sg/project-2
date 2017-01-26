var isLoggedIn = require('./middleware/isLoggedIn');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var app = express();
var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var Bus= require('./models/bus')
var BusStop= require('./models/busStop')
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
app.use(express.static(__dirname + '/views'));
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
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

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
