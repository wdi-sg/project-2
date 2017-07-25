require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./config/passport')
const homeRoute = require('./routes/homeRoute')
const usersRoute = require('./routes/usersRoute')
var bodyParser = require('body-parser')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
}).then(
  function () { // resolve cb
    console.log('connected to MongoDB successfully')
  },
  function (err) { // reject cb
    console.log(err)
  }
)

//app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore ({
    url:process.env.MONGODB_URI
  })
}))
//app.use(flash)

app.use(passport.initialize())
app.use(passport.session())
app.use(require('morgan')('dev'))

app.use(express.static('public'))
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
app.use('/home', homeRoute)
app.use('/users', usersRoute)
app.get('/', function (req, res) {
  res.render('index')
})
app.get('/about', function (req, res) {
  res.render('about')
})
app.get('/contact', function (req, res) {
  res.render('contact')
})

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`express is running on ${port}`)
})
