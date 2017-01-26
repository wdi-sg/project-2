require('dotenv').config({silent: true})
const mongoose = require('mongoose')
const express = require('express')
const session = require('express-session')
const ejsLayouts = require('express-ejs-layouts')
const passport = require('./config/ppConfig')
const isLoggedIn = require('./middleware/isLoggedIn')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const Classroom = require('./models/classroom').model
const Assignment = require('./models/assignment').model


mongoose.connect('mongodb://localhost/managehomework')
mongoose.Promise = global.Promise;


app.set('view engine', 'ejs')
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
})
app.use(ejsLayouts)
app.use(methodOverride('_method'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use('/auth', require('./controllers/authentications_controller'))
app.use('/assignment', require('./controllers/assignments_controller'))
app.use('/classroom', require('./controllers/classrooms_controller'))

app.get('/', function(req, res) {
  res.render('index')
})

app.get('/dashboard', isLoggedIn, function(req, res) {
  res.redirect('auth/dashboard')
})


var server = app.listen(process.env.PORT || 3000)
console.log('Server UP')

module.exports = server
