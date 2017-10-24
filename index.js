require('dotenv').config({silent: true})

const url = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/test'
const port = process.env.PORT || 9000

// installing all modules
const bodyParser = require('body-parser') // for accessing POST request
const express = require('express')
const exphbs = require('express-handlebars')
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

app.get('/credt-card', (req, res) => {
  res.render('credt-card', {
    title: 'Credt Card'
  })
})

app.get('/fixed-deposit', (req, res) => {
  res.render('bank-account/fixed-deposit', {
    title: 'Fixed Deposit'
  })
})

app.get('/savings-account', (req, res) => {
  res.render('bank-account/savings-account', {
    title: 'Savings Account'
  })
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

app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login'
  })
})

app.get('/register', (req, res) => {
  res.render('register', {
    title: 'register'
  })
})

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
