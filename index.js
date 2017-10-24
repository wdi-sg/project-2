require('dotenv').config({ silent: true })

const dbUrl =
process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/conso_test'
const port = process.env.PORT || 4000 // Express server port

// const quoteApiKey = process.env.QUOTEAPI

// installing all modules
const express = require('express')
const path = require('path') // for Public files
const mongoose = require('mongoose')
const exphbs = require('express-handlebars') // for Handlebars
const bodyParser = require('body-parser') // for accessing POST request
const methodOverride = require('method-override') // for accessing PUT / DELETE
const session = require('express-session') // to create session and cookies
const MongoStore = require('connect-mongo')(session) // to store session into db
const passport = require('./config/passport_config') // to register passport strategies

// HELPER
const { hasLoggedOut, isLoggedIn } = require('./helpers')

// MODELS
const User = require('./models/user')
const Component = require('./models/component')

// ROUTERS
const register_routes = require('./routes/register_routes')
const login_routes = require('./routes/login_routes')
const component_routes = require('./routes/component_routes')
// initiating express, by calling express variable
const app = express()

// VIEW ENGINES
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')))
app.use(function (req, res, next) {
  console.log('Method: ' + req.method + ' Path: ' + req.url)
  next()
})
// setup bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
// setup methodOverride
app.use(methodOverride('_method'))

// connecting to mongodb via mongoose
mongoose.Promise = global.Promise
mongoose.connect(dbUrl, {
  useMongoClient: true
})
.then(
  () => { console.log('db is connected') },
  (err) => { console.log(err) }
)

// activation of session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  // store this to our db too
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// activate PASSPORT
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  app.locals.user = req.user
  next()
})

app.use('/register', isLoggedIn, register_routes)
app.use('/login', isLoggedIn, login_routes)
app.use('/components', component_routes)

app.get('/logout', hasLoggedOut, (req, res) => {
  req.logout()
  res.redirect('/')
})

app.get('/', (req, res) => {
  res.render('home')
})

// opening the port for express
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
