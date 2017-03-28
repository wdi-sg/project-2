require('dotenv').config({silent: true})
const mongoose = require('mongoose')
const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const ejsLayouts = require('express-ejs-layouts')
const passport = require('./config/ppConfig')
const isLoggedin = require('./middleware/isLoggedin')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const auth = require('./routes/auth')
const profile = require('./routes/profile')
const assignment = require('./routes/assignment')
const classroom = require('./routes/classroom')
const Classroom = require('./models/classroom').model

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/managehomework')
mongoose.Promise = global.Promise;


app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
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

app.use('/auth', auth)
app.use('/profile', profile)
app.use('/assignment', assignment)
app.use('/classroom', classroom)



app.get('/', function (req, res) {
  Classroom.find({})
  .populate('school', 'name')
  .exec(function (err, classrooms) {
    if (err) {return console.log(err)}
    res.render('index', {classrooms: classrooms})
  })
})

// app.get('/dashboard', isLoggedin, function (req, res) {
//   res.redirect('/dashboard')
// })

// app.get('/logout', function (req, res) {
//   req.logout()
//   req.flash('success', 'You have logged out')
//   res.redirect('/')
// });






var server = app.listen(process.env.PORT || 3000)
console.log('Server UP')

module.exports = server
