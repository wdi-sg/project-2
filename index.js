require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const app = express()

// connect to mongoose database
const url = process.env.MLAB_URI || 'mongodb://localhost:27017/vacays'
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

// setup express session
app.use(session({
  store: new MongoStore({
    url: process.env.MLAB_URI || 'mongodb://localhost/vacays'
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// initialize passport
const passport = require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

// setup bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// setup handlebars
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(flash())

app.get('/', function (req, res) {
  res.render('index')
})

app.use(function (req, res, next) {
  app.locals.flash = req.flash('message')
  app.locals.user = req.user
  next()
})

// all the routes variables
const authRoutes = require('./routes/auth_routes')
app.use('/', authRoutes)
const countryRoutes = require('./routes/country_routes')
app.use('/countries', countryRoutes)
const voteRoutes = require('./routes/vote_routes')
app.use('/votes', voteRoutes)

const port = process.env.PORT || 4000
app.listen(port, function () {
  console.log('express is running on port ' + port)
})
