// setup environment
require('dotenv').config({ silent: true })

// setting dburl and port
const dbUrl = process.env.MONGODB_URI|| 'mongodb://localhost/project2'
const port = process.env.PORT || 4000

// installing all modules
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs  = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./config/ppConfig')

// models
const User = require('./models/user')

// check login status
const { hasLoggedOut, isLoggedIn } = require('./helpers')

// requiring routes
const register_routes = require('./routes/register_routes')
const login_routes = require('./routes/login_routes')
const profile_routes = require('./routes/profile_routes')
const home_routes = require('./routes/home_routes')

// initiating express
const app = express()

// view engine setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// static path setup
app.use(express.static(path.join(__dirname, 'public')))

// setup bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// setup methodOverride
app.use(methodOverride('_method'))

// connect to mongodb via mongoose
mongoose.Promise = global.Promise
mongoose.connect(dbUrl, {
  useMongoClient: true
})
.then(
  () => { console.log('Connected to database') },
  (err) => { console.log(err) }
)

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  // store this to our db too
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  app.locals.user = req.user
  next()
})

app.get('/logout', hasLoggedOut, (req, res) => {
  req.logout()
  res.redirect('/')
})

// routes
app.use('/register', isLoggedIn, register_routes)
app.use('/login', isLoggedIn, login_routes)
app.use('/profile', hasLoggedOut, profile_routes)
app.use('/', home_routes)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
