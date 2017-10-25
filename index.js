require('dotenv').config({ silent: true })

const dbUrl =
process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/project'

const port = process.env.PORT || 9000

const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const multer = require('multer')
const cloudinary = require('cloudinary')
const server = require('http')
const io = require('socket.io').listen(server)
var upload = multer({ dest: './uploads/' })

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./config/ppConfig')

const User = require('./models/user')
const Listings = require('./models/listings')
const register_routes = require('./routes/register_routes')
const login_routes = require('./routes/login_routes')
const listings_routes = require('./routes/listings_routes')
const { hasLoggedOut, isLoggedIn } = require('./helpers')

const app = express()

cloudinary.config({
  cloud_name: 'dhbynh1cm',
  api_key: '929476258342752',
  api_secret: 'zDirnIRxdA24cAvVBUJEbHQorHU'
})

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

app.use(methodOverride('_method'))

app.use(passport.initialize())
app.use(passport.session())
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use((req, res, next) => {
  app.locals.user = req.user
  next()
})

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/profile/:slug', hasLoggedOut, (req, res) => {
  User.findOne({
    slug: req.params.slug
  })
  .then((user) => {
    res.render('users/show', {
      user
    })
  })
})

app.post('/profile/:slug', (req, res) =>{
  Listings.find()
  .then((listing) => {
    // if(req.user._id === req.listings.author)
    res.render('/users/show',{
      listing
    })
  })
})

app.get('/logout', hasLoggedOut, (req, res) => {
  req.logout()
  res.redirect('/')
})

app.use('/login', isLoggedIn, login_routes)
app.use('/register', isLoggedIn, register_routes)
app.use('/listings', hasLoggedOut, listings_routes)


app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
