require('dotenv').config({ silent: true })

// Server
const dbUrl =
process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/project'

const port = process.env.PORT || 9000

// Installing all modules
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./config/ppConfig')

// Requiring models and routes
const User = require('./models/user')
const Listings = require('./models/listings')
const Offers = require('./models/offer')
const register_routes = require('./routes/register_routes')
const login_routes = require('./routes/login_routes')
const listings_routes = require('./routes/listings_routes')
const profile_routes = require('./routes/profile_routes')

// Requiring helper
const { hasLoggedOut, isLoggedIn } = require('./helpers')

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))
app.use(function (req, res, next) {
  console.log('Method: ' + req.method + ' Path: ' + req.url)
  next()
})

// Setup body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// Setup method override
app.use(methodOverride('_method'))

// Connecting to mongoose
mongoose.Promise = global.Promise
mongoose.connect(dbUrl, {
  useMongoClient: true
})
.then(
  () => { console.log('db is connected') },
  (err) => { console.log(err) }
)

// Setup session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))


app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  app.locals.user = req.user
  app.locals.listings = req.listings
  next()
})

app.get('/', (req, res) => {
  res.render('home')
})

app.use('/login', isLoggedIn, login_routes)
app.use('/register', isLoggedIn, register_routes)
app.use('/profile', hasLoggedOut, profile_routes)
app.use('/listings', hasLoggedOut, listings_routes)
app.get('/logout', hasLoggedOut, (req, res) => {
  req.logout()
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
