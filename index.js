
// this is too make sure you can access the `.env` file
require('dotenv').config({ silent : true })

const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const path = require('path')

const session = require('express-session') // to create session and cookies
const MongoStore = require('connect-mongo')(session) // to store session into db
const passport = require('./config/ppConfig') // to register passport strategies

const { hasLoggedOut, isLoggedIn } = require('./helpers')

const dbUrl = process.env.MONGODB_URI||'mongodb://localhost/GreenieGoGo'
const port = process.env.PORT || 5000

const app = express()

//cloudinary
// const multer = require('multer')

const cloudinary = require('cloudinary')

// var upload = multer({ dest: './uploads/' })

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})


// MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')))
app.use(function (req, res, next) {
  console.log('Method: ' + req.method + ' Path: ' + req.url)
  next()
})

// Activation of session after you connect to mongoose
// MUST BE AFTER YOUR `mongoose.connect`
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  // store this to our db too
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))


//setup handlebars
app.engine('handlebars',exphbs({ defaultLayout:'main' }))
app.set('view engine','handlebars')

//connectting to mongodb before we start the server via mongoose
mongoose.Promise = global.Promise
mongoose.connect(dbUrl,{
  useMongoClient: true
})
.then(
  ()=> {console.log('db is connected')},
  (err) => {console.log(err)}
)

// setup bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// setup methodOverride
app.use(methodOverride('_method'))

// must be below your session configuration
// THIS IS WHERE PASSPORT GOT ACTIVATED
app.use(passport.initialize())
app.use(passport.session())

const Customer = require('./models/customer')
//require all my route files
const register_routes = require('./routes/register_routes')
const login_routes = require('./routes/login_routes')
const supplier_routes = require('./routes/supplier_routes')
const vegetable_routes = require('./routes/vegetable_routes')


// why we use. `app.use`, because we want to apply this local data for EVERY routes
// `app.use` => GET, POST, PUT, DELETE request for ALL routes
app.use((req, res, next) => {
  app.locals.user = req.user
  if (req.user) {
    app.locals.admin = req.user.type === 'admin' ? req.user : null
  }
  // app.locals.admin  // we'll only `req.user` if we managed to log in
  next()
})

app.get('/',(req,res) => {
  res.render('home')
})

app.get('/profile', hasLoggedOut, (req, res) => {
  // UPDATE 23 OCT
  res.send(req.customer)
})

// NEW ROUTE - LOGOUT
app.get('/logout', hasLoggedOut, (req, res) => {
  req.logout()
  res.redirect('/')
})


app.use('/register',isLoggedIn, register_routes)
app.use('/login', isLoggedIn, login_routes)

app.use('/supplier',hasLoggedOut, supplier_routes)
app.use('/vegetable', hasLoggedOut, vegetable_routes)
app.use('/admin', hasLoggedOut, vegetable_routes)
app.use('/vegetable',hasLoggedOut, supplier_routes)


app.listen(port,() =>{
  console.log(`Hello server is running on ${port}`);
})
