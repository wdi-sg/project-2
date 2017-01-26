const express = require('express');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ejsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
//lol wtf you required methodOverride to be connect-flash..
const methodOverride = require('method-override');
const colors = require('colors');
const morgan = require('morgan');

const routesAuth = require('./routes/auth');
const routesDashboard = require('./routes/dashboard');
const app = express();
require('dotenv').config({ silent : true });

//checking the node environment to run tests or normal on the test db or normal db
process.env.NODE_ENV === 'test' ?
  mongoose.connect('mongodb://localhost/second-project-test', function(){
    console.log('connected to the test db'.cyan);
}) :
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/second-project', function(){
  console.log('connected to the normal db'.magenta);
});

mongoose.Promise = global.Promise;

app.set('view engine','ejs');
app.use(session({
  secret : process.env.SESSION_SECRET,
  resave : false,
  saveUninitialized : true
}));
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(favicon(__dirname + '/public/favicon.ico'));
//using morgan middleware;
app.use(morgan('dev'));
//serving the public folder as static
app.use(express.static(path.join(__dirname,'public')));
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

app.use(function(req,res,next){
  res.locals.alerts = req.flash();
  res.locals.user = req.user || null;
  next();
})


function customMiddleware(req,res,next){
  console.log('------------------------------------------------------------------------------------------'.rainbow);
  //proceeding on towards the next middleware
  next();
}

function isLoggedIn(req,res,next){
  if (!req.user){
    res.redirect('/');
  } else {
    next();
  }
}

app.use(customMiddleware);

app.use('/auth',routesAuth);
app.use('/dashboard', isLoggedIn, routesDashboard);

app.get('/about',function(req,res){
  res.render('about');
})

app.get('/',function(req,res){
  res.render('main');
})


module.exports = app.listen(process.env.PORT || 8888, function(){
  console.log('server is running on PORT 8888....');
})
