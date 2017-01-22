require('colors')
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const ejsLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')

const index = require('./routes/index')
const users = require('./routes/users')

const app = express()

// connect to MongoDB based on environment (test or dev).
if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/proj2-test')
  console.log('CONNECTING TO TEST SERVER...'.blue)
} else if (process.env.NODE_ENV === 'dev') {
  mongoose.connect('mongodb://localhost/proj2-dev')
  console.log('CONNECTING TO DEV SERVER...'.blue)
}

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(ejsLayouts)

app.use('/', index)
app.use('/users', users)

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
