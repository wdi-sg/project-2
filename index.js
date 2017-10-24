require('dotenv').config({silent: true})

// ======= Setup of Dependencies & Middlewares ======= //
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const dbUrl = 'mongodb://localhost/MakeGood'
const port = process.env.PORT || 3000
const passport = require('./config/ppConfig')

// ======= Setup of Routes ======= //
const signupRoutes = require('./routes/signup_routes')
const gigsRoutes = require('./routes/gigs_routes')
const loginRoutes = require('./routes/login_routes')
const profileRoutes = require('./routes/profile_routes')

const User = require('./models/user')

const app = express()

// ======= Use Middlewares ====== //
app.use(express.static(path.join(__dirname, 'public')))
app.use(function (req, res, next) {
  console.log('Method: ' + req.method + ' Path: ' + req.url)
  next()
})

app.use(passport.initialize())
app.use(passport.session())
app.use(session({
  secret: 'secret test',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use((req, res, next) => {
  app.locals.user = req.user
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

// ======= Setup of main GET reqs ======= //
/* Using handlebars template engine */
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('gigs-search')
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/peeps', (req, res) => {
  User.find()
  // User.find().limit(10)
.then(user => {
  res.render('peeps-search', {
    user
  })
})
.catch(err => {
  console.log(err)
})
})

app.post('/peeps', (req, res) => {
  const keyword = req.body.keyword
  const regex = new RegExp(keyword, 'i')

  User.find({
    name: regex
  })
  // .limit(9)

  .then(user => res.send(user))
  .catch(err => res.send(err)) // in case we have an error
})

// ======= Use Routes ======= //
app.use('/signup', signupRoutes)
app.use('/gigs', gigsRoutes)
app.use('/login', loginRoutes)
app.use('/profile', profileRoutes)

// ======= END: Local port Listen ======= //
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
