require('dotenv').config({ silent: true })
const express = require('express')
const app = express()
const port = process.env.PORT || 7000
const dbUrl = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/project-2'
const sgMail = require('@sendgrid/mail')

const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const flash = require('connect-flash')

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./config/ppConfig')
const { hasLoggedOut, isLoggedIn } = require('./helpers')

const home_router = require('./routes/home_router')
const user_login_router = require('./routes/user_login')
const user_register_router = require('./routes/user_register')
const quotes_router = require('./routes/quotes')

// Setting up handlebars engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Middlewares here

app.use(express.static(path.join(__dirname, 'public')))
app.use(function (req, res, next) {
  console.log('Method' + req.method + ' Path: ' + req.url)
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

mongoose.Promise = global.Promise
mongoose.connect(dbUrl, { useMongoClient: true })
.then(() => { console.log('db is connected') },
err => console.log(err))

app.use(session({  // activating the sessions
  secret: process.env.SESSION_SECRET, // to hash ur session data
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
  // store this to our db too
}))

app.use(passport.initialize()) // activating
app.use(passport.session()) // use the session

app.use((req, res, next) => {
  app.locals.user = req.user
  next()
})


app.use('/', home_router)
app.use('/register', isLoggedIn, user_register_router)
app.use('/login', isLoggedIn, user_login_router)
app.use('/quotes', quotes_router)

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})


app.listen(port, () => {
  console.log('connected to port 7000 successfully')
})
