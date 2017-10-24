require('dotenv').config({ silent: true })

const dbUrl =
process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/project2'
const port = process.env.PORT || 4000  // this is for our express server

const quoteApiKey = process.env.QUOTEAPI
// installing all modules
const express = require('express')
const path = require('path') // for Public files
const mongoose = require('mongoose') // for DB
const exphbs = require('express-handlebars') // for Handlebars
const bodyParser = require('body-parser') // for accessing POST request
const methodOverride = require('method-override') // for accessing PUT / DELETE

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./config/ppConfig')

const User = require('./models/user')
// const Restaurant = require('./models/restaurant')

// require all my route files
// const register_routes = require('./routes/register_routes')
// const login_routes = require('./routes/login_routes')

// initiating express, by calling express variable
const app = express()

// VIEW ENGINES aka handlebars setup
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
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

// connecting to mongodb before we starting the server
// via mongoose
mongoose.Promise = global.Promise // the formidable Promise, so we can use .then()
mongoose.connect(dbUrl, {
  // this means that technically mongoose use the same technique
  // like MongoClient.connect
  useMongoClient: true
}) // http://mongoosejs.com/docs/connections.html
.then(
  () => { console.log('db is connected') },
  (err) => { console.log(err) }
)

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   // store this to our db too
//   store: new MongoStore({ mongooseConnection: mongoose.connection })
// }))
//
// app.use(passport.initialize())
// app.use(passport.session())

// HOMEPAGE
app.get('/', (req, res) => {
  res.render('home')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
}))

app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register', (req, res) => {
  // UPDATE BEFORE CLASS 20 Oct
  var formData = req.body
  var newUser = new User({
    name: formData.name,
    // this name => slug => alex-min
    // hence, /profile/alex-min
    email: formData.email,
    password: formData.password // NOTICE, we're going to update this
  })

  // // PITSTOP: UPDATE UPDATE
  // // no .catch() for save
  // // this is very similar to how mongoose.connect
  newUser.save() // save the object that was created
  .then(
    user => res.redirect(`/profile`),
    // success flow, redirect to profile page
    err => res.send(err) // error flow
  )
})


// NEW ROUTES
// app.use('/register', register_routes)
// app.use('/login', login_routes)

// opening the port for express
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
