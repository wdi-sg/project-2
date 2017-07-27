require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const bodyParser = require('body-parser')


const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/placies'

mongoose.Promise = global.Promise
mongoose.connect(url, {
  useMongoClient: true
}).then(
  function () {
    console.log('connected successfully')
  },
  function (err) {
    console.log(err)
  }
)

const app = express()

// set middleware
app.use(express.static('public'))
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGODB_URI
  })
}))


const passport = require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

const eventRoute = require('./routes/eventRoute')
const userRoute = require('./routes/userRoute')
const contactRoute = require('./routes/contactRoute')


app.locals = {
  EVENTBRITE_API_KEY: process.env.EVENTBRITE_API_KEY
}

app.use(flash())
app.use(function (req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.sessionFlash = req.flash()
  res.locals.currentUser = req.user
  next()
})

app.get('/', function (req, res) {
  res.render('home', {
    user: req.user
  })
})

app.use('/events', eventRoute)
app.use('/users', userRoute)
app.use('/contact', contactRoute)

app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

const port = process.env.PORT || 1991

app.listen(port, function () {
  console.log(`express is running on ${port}`)
})
