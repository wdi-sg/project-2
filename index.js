require('dotenv').config({ silent: true })

const dbUrl =
process.env.NODE_ENV === 'production' ? process.env.MLAB_URI : 'mongodb://localhost/test'
const port = process.env.PORT || 4000

// install all modules
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const session = require('express-session') // to create session and cookies
const MongoStore = require('connect-mongo')(session) // to store session into db
const passport = require('./config/ppConfig') // to register passport strategies

const { hasLoggedOut, isLoggedIn } = require('./helpers')

const User = require('./models/user')

// require routes
const login_routes = require('./routes/login_routes')
const register_routes = require('./routes/register_routes')
const browse_routes = require('./routes/browse_routes')

// setup express
const app = express()

// setup middleware
app.use(express.static(path.join(__dirname, 'public'))) // static path
app.use(function (req, res, next) {
  console.log('Method: ' + req.method + ' Path: ' + req.url)
  next()
})

// setup handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// setup bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// setup methodOverride
app.use(methodOverride('_method'))

// connecting to mongodb before we start the server
// via mongoose
mongoose.Promise = global.Promise // the formidable Promise, so we can use .then()
mongoose.connect(dbUrl, {
  useMongoClient: true
})
.then(
  () => { console.log('database is connected') },
  (err) => { console.log(err) }
)

// OCT 23. activation of session after you connect to mongoose
// MUST BE AFTER YOUR `mongoose.connect`
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  // store this to our db too
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// OCT 23. must be below your session configuration
// THIS IS WHERE PASSPORT GOT ACTIVATED
app.use(passport.initialize())
app.use(passport.session())

// ROUTE to home
app.get('/', (req, res) => {
  res.render('home')
})

// NEW ROUTES - admin registration flow
app.use('/login', login_routes)
app.use('/register', register_routes)
app.use('/browse', browse_routes)

// ROUTE for logout
app.get('/logout', hasLoggedOut, (req, res) => {
  req.logout()
  res.redirect('/register')
})

// opening port for express
app.listen(4000, () => {
  console.log(`Server is running on 4000`)
})
