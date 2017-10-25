require('dotenv').config({silent: true})

const url = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/fatPocketLH'
const port = process.env.PORT || 9000

// installing all modules
const bodyParser = require('body-parser') // for accessing POST request
const express = require('express')
const exphbs = require('express-handlebars')
const { hasLoggedOut, isLoggedIn } = require('./helpers')
const methodOverride = require('method-override') // for accessing PUT / DELETE
const mongoose = require('mongoose') // for DB
const path = require('path') // for Public files
const passport = require('./config/ppConfig') // to register passport strategies
const session = require('express-session') // to create session and cookies
const MongoStore = require('connect-mongo')(session) // to store session into db

// require all model files
const User = require('./models/user')
const creditCard = require('./models/credit-card')
const savingsAccount = require('./models/savings-account')
const fixedDeposit = require('./models/fixed-deposit')

// require all my route files
// const profile_routes = require('./routes/profile_routes')
const login_routes = require('./routes/login_routes')
const register_routes = require('./routes/register_routes')
const profile_routes = require('./routes/profile_routes')
const fixed_deposit_routes = require('./routes/fixed_deposit_routes')

// initiating express, by calling express variable
const app = express()

// VIEW ENGINES aka handlebars setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// MIDDLEWARES (explained on thursday)
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

mongoose.Promise = global.Promise
mongoose.connect(url, {
  useMongoClient: true
})
.then(
  () => { console.log('db is connected') },
  (err) => { console.log(err) }
)

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
  next()
})

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/credit-card', (req, res) => {
  res.render('credit-card')
})

app.get('/savings-account', (req, res) => {
  res.render('bank-account/savings-account')
})

app.get('/investment-account', (req, res) => {
  res.render('investment/investment-account', {
    title: 'Ivestment Account'
  })
})

app.get('/news', (req, res) => {
  res.render('bank-account/news', {
    title: 'Investment News'
  })
})

app.get('/register', isLoggedIn, (req, res) => {
  res.render('register')
})

app.get('/logout', hasLoggedOut, (req, res) => {
  req.logout()
  res.redirect('/')
})

app.use('/login', isLoggedIn, login_routes)
app.use('/register', isLoggedIn, register_routes)
app.use('/profile', hasLoggedOut, profile_routes)
app.use('/fixed-deposit', fixed_deposit_routes)

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
