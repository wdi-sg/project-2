require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const passport = require('./config/passport')

const url = process.env.MLAB_URI || 'mongodb://localhost:27017/project2'

mongoose.Promise = global.Promise
mongoose.connect(url, {
  useMongoClient: true
}).then(
  function () { // resolve cb
    console.log('connected successfully')
  },
  function (err) { // reject cb
    console.log(err)
  }
)

const app = express()

app.use(session({
  store: new MongoStore({
    url: process.env.MLAB_URI
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(flash())

const placesRoute = require('./routes/placeRoute')
const usersRoute = require('./routes/userRoute')
const tripsRoute = require('./routes/tripRoute')

app.get('/', function (req, res) {
  res.render('index', {
    user: req.user
  })
})

app.use('/places', placesRoute)
app.use('/users', usersRoute)
app.use('/trips', tripsRoute)

app.locals = {
  GOOGLE_MAPS_URL: process.env.GOOGLE_MAPS_URL
}

const port = process.env.PORT || 5200
app.listen(port, function () {
  console.log(`express is running on ${port}`)
})
