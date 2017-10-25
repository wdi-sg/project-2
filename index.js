require('dotenv').config({ silent: true })

const dbUrl = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/project2'
const port = process.env.PORT || 4000

const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./config/ppConfig')

const User = require('./models/user')
//const Pharmacy = require('./models/pharmacies')

const { hasLoggedOut, isLoggedIn } = require('./helpers')

const register_routes = require('./routes/register_routes')
const login_routes = require('./routes/login_routes')
const profile_routes = require('./routes/profile_routes')
const pharmacy_routes = require('./routes/pharmacy_routes')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))
app.use(function (req, res, next) {
  console.log('Method:' + req.method + 'Path: ' + req.url)
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
  () => { console.log('db is connected') },
  err => { console.log(err) }
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
app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

app.use('/register', isLoggedIn, register_routes)
app.use('/login', isLoggedIn, login_routes)
app.use('/profile', hasLoggedOut, profile_routes)
// app.use('/pharmacies', pharmacy_routes)

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
