const port = process.env.PORT || 3000
const dbUrl = process.env.NODE_ENV === 'production' ?
  process.env.MONGODB_URI : 'mongodb://localhost/project2'
const request = require('request-promise-native')
const express = require('express')
const mongoose = require('mongoose') // for DB
const {
  hasLoggedOut,
  isLoggedIn
} = require('./helpers')
const User = require('./models/user')
const Stop = require('./models/stop') //to chnage to route later
const BusService = require('./models/busService')
const path = require('path') // for Public files
const exphbs = require('express-handlebars') // for Handlebars
const bodyParser = require('body-parser') // for accessing POST request
const methodOverride = require('method-override') // for accessing PUT / DELETE
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./config/ppConfig');

require('dotenv').config({
  silent: true
})
const home_routes = require('./routes/home_routes')
const register_routes = require('./routes/register_routes')
const login_routes = require('./routes/login_routes')
const load_routes = require('./routes/load_routes')
const stop_routes = require('./routes/stop_routes')

const app = express()
// VIEW ENGINES aka handlebars setup
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))
app.use(function(req, res, next) {
  console.log('Method: ' + req.method + ' Path: ' + req.url)
  next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(methodOverride('_method'))

mongoose.Promise = global.Promise
mongoose.connect(dbUrl, {
    useMongoClient: true
  })
  .then(
    () => {
      console.log('db is connected')
    },
    (err) => {
      console.log(err)
    }
  )
//session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}))
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.user = req.user // we'll only `req.user` if we managed to log in
  next() //make sure other requests continue!
})


app.get('/profile', (req, res) => {
  // User.findOne({
  //     slug: req.params.slug
  //   })
  //   .then((user) => {
  //     res.render('users/show', {
  //       user
  //     })
  //   })
  res.send(req.user)
})
app.use('/', home_routes)
app.use('/stop', stop_routes)
app.use('/load', load_routes)
app.use('/register', register_routes)
app.use('/login', isLoggedIn, login_routes)
app.get('/logout', hasLoggedOut, (req, res) => {
  req.logout()
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})

module.exports = app
