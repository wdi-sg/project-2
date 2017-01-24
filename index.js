require('dotenv').config({ silent: true })
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const passport = require('./config/ppConfig')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const productController = require('./controllers/productController')
const msgController = require('./controllers/msgController')
const userAuth = require('./controllers/auth')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const express = require('express')
const morgan = require('morgan')
const app = express()

if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/buy2gether-test')
} else {
  mongoose.connect('mongodb://localhost/buy2gether')
}
mongoose.Promise = global.Promise
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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(ejsLayouts)
app.use(methodOverride('_method'))

app.use(function (req, res, next) {
  res.locals.alerts = req.flash()
  res.locals.currentUser = req.user
  next()
})

// app.pre('save', function (req, res, next) {
//   if (this.respondby < this.productdatecreated) {
//     req.flash('error', 'Pls input a respond by date later than today.')
//     res.redirect('/products/new')
//   }
//   next()
// })

app.get('/index', function (req, res) {
  res.render('index')
})

app.use('/auth', userAuth)

app.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile')
})

app.use(isLoggedIn)

app.use('/products', productController)
app.use('/products', msgController)

var server = app.listen(process.env.PORT || 3000)
console.log('Server UP')

module.exports = server
