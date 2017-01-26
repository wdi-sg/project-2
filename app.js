require('colors')
require('dotenv').config({silent: true})
const logging = process.env.LOGGING
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const ejsLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('./config/passport')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')

const index = require('./routes/index')
const users = require('./routes/users')
const playlists = require('./routes/playlists')

const app = express()

// connect to MongoDB based on environment (test or dev).
if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/proj2-test')
  console.log('CONNECTING TO TEST SERVER...'.blue)
} else if (process.env.NODE_ENV === 'dev') {
  mongoose.connect('mongodb://localhost/proj2-dev')
  console.log('CONNECTING TO DEV SERVER...'.blue)
} else {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cue-production')
  console.log('CONNECTING TO PRODUCTION SERVER...'.blue)
}
mongoose.Promise = global.Promise


// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// login, sessions, flash
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

// parsing, pathing
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))
if (logging) app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(ejsLayouts)

// local variables
app.use((req, res, next) => {
  res.locals.flash = req.flash()
  if (req.user) {
    res.locals.user = req.user
    res.locals.user.firstName = req.user.name.split(' ')[0]
  } else {
    res.locals.user = {firstName: 'stranger'}
  }
  // console.log(JSON.stringify(res.locals,null, 2).blue)
  next()
})

app.use('/users', users)
app.use('/', index)

app.use(isLoggedIn)

app.use('/playlists', playlists)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

const port = process.env.PORT || 3000
app.listen(port)

console.log('SERVER UP ON PORT '.blue + port)
module.exports = app
