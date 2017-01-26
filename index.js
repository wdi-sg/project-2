const express = require('express')
const app = express()
const path = require('path')
const ejsLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const auth = require('./routes/auth_router')
const profile = require('./routes/profile_router')
const program = require('./routes/program_router')
const beneficiary = require('./routes/beneficiary_router')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('./config/ppConfig')
const isLoggedIn = require('./middleware/isLoggedIn')
require('dotenv').config({ silent: true })

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/volenti')
mongoose.Promise = global.Promise

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use(morgan('dev'))

app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(ejsLayouts)

app.use(function (req, res, next) {
  res.locals.alerts = req.flash()
  res.locals.currentUser = req.user
  next()
})

app.get('/', function (req, res) {
  res.render('index')
})

app.use('/auth', auth)
app.use('/profile', profile)
app.use('/program', program)
app.use('/beneficiary', beneficiary)

app.use(isLoggedIn)

// app.get('/profile', function (req, res) {
//   res.render('profile')
// })

app.get('/program', function (req, res) {
  res.render('program')
})

app.get('/beneficiary')

app.listen(process.env.PORT || 3000)
