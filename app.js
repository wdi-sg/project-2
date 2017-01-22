const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ejsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('connect-flash');
const colors = require('colors');
const morgan = require('morgan');

const routesAuth = require('./routes/auth');
const routesDashboard = require('./routes/dashboard');
const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/second-project');
mongoose.Promise = global.Promise;

app.set('view engine','ejs');
//using morgan middleware;
app.use(morgan('dev'));
//serving the public folder as static
app.use(express.static(path.join(__dirname,'public')));
app.use(ejsLayouts);


function customMiddleWare(req,res,next){
  console.log('---------------------------------------------'.rainbow);
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

app.use(customMiddleWare);

app.use('/auth',routesAuth);
app.use('/dashboard',routesDashboard);

app.get('/about',function(req,res){
  res.render('about');
})

app.get('/',function(req,res){
  res.render('main');
})


module.exports = app.listen(process.env.PORT || 8888, function(){
  console.log('server is running on PORT 8888....');
})
