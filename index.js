require('dotenv').config({ silent: true })

const dbUrl =
process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/project2'
const port = process.env.PORT || 4000  // this is for our express server

const express = require('express')
const path = require('path') // for Public files
const mongoose = require('mongoose') // for DB
const exphbs = require('express-handlebars') // for Handlebars
const bodyParser = require('body-parser') // for accessing POST request
const methodOverride = require('method-override') // for accessing PUT / DELETE

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./config/ppConfig')

const { hasLoggedOut, isLoggedIn } = require('./helpers')

const User = require('./models/user')
const Show = require('./models/show')

const register_routes = require('./routes/register_routes')
const tvshow_routes = require('./routes/tvshow_routes')
const login_routes = require('./routes/login_routes')
const tour_routes = require('./routes/tour_routes')
const review_routes = require('./routes/review_routes')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// MIDDLEWARES (explained on thursday)

app.use(express.static(path.join(__dirname, 'public')))
app.use(function (req, res, next) {
  console.log('Method: ' + req.method + ' Path: ' + req.url)
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

///----------------------------------------
app.use((req, res, next) => {
  app.locals.user = req.user // we'll only `req.user` if we managed to log in
  next()
})

// HOMEPAGE
app.get('/', (req, res) => {
  Show.find()
    .then((data) => {
      res.render('home', { showlist: data })
      // res.send(data)
    })
})

app.get('/show/:id', (req, res) => {
  res.render('show/show_tourlist')
})

app.use('/login', login_routes)
app.use('/register', register_routes)
app.use('/addtvshows', tvshow_routes)
app.use('/addtours', tour_routes)
app.use('/review', review_routes)

app.get('/profile', hasLoggedOut, (req, res) => {
  res.send(req.user)
})

app.get('/logout', hasLoggedOut, (req, res) => {
  req.logout()
  res.redirect('/')
})

// opening the port for express
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
