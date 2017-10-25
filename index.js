require('dotenv').config({ silent: true })  // for accessing .env files

const dbUrl = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/project-2'
const port = process.env.PORT || 8000

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

// for image upload
const multer = require('multer')
const upload = multer({ dest: './uploads/' });
const cloudinary = require('cloudinary')

// for helpers
const { hasLoggedOut, isLoggedIn } = require('./helpers')

const User = require('./models/user')
const Location = require('./models/location')
const Admin = require('./models/admin')


// require route files
const register_routes = require('./routes/register_routes')
const login_routes = require('./routes/login_routes')
const location_routes = require('./routes/location_routes')
const comment_routes = require('./routes/comment_routes')
const admin_routes = require('./routes/admin_routes')


// initiating express, by calling express variable
const app = express()

// VIEW ENGINES aka handlebars setup
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// MIDDLEWARES
// setup path
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

// setup session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  // store this to our db too
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// setup passport
app.use(passport.initialize())
app.use(passport.session())

// why we use. `app.use`, because we want to apply this local data for EVERY routes
// `app.use` => GET, POST, PUT, DELETE request for ALL routes
app.use((req, res, next) => {
  app.locals.user = req.user // we'll only `req.user` if we managed to log in
  next()
})


// Homepage
app.get('/', (req, res) => {
  Location.find().limit(10)
  .then(locations => {

    res.render('home', {
      locations
    })
  })
  .catch(err => {
    console.log(err)
  })
})

// Route to profile
app.get('/profile', hasLoggedOut, (req, res) => {
  res.send(req.user)
})


//  Route to logout
app.get('/logout', hasLoggedOut, (req, res) => {
  req.logout()
  res.redirect('/')
})

// setup routes
app.use('/register', isLoggedIn, register_routes)
app.use('/login', isLoggedIn, login_routes)
app.use('/locations', location_routes)
app.use('/comments', comment_routes)
app.use('/admin', admin_routes)


// opening the port for express
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
