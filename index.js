const port = 3000 || process.env.PORT
const dbUrl = process.env.NODE_ENV === 'production' ?
  process.env.MONGODB_URI : 'mongodb://localhost/project2'

const express = require('express')
const mongoose = require('mongoose') // for DB
const User = require('./models/user')
const path = require('path') // for Public files
const exphbs = require('express-handlebars') // for Handlebars
const bodyParser = require('body-parser') // for accessing POST request
const methodOverride = require('method-override') // for accessing PUT / DELETE
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./config/ppConfig');

require('dotenv').config({
  silent: true
})


const register_routes = require('./routes/register_routes')
const login_routes = require('./routes/login_routes')

const app = express()
// VIEW ENGINES aka handlebars setup
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))
app.use(function(req, res, next) {
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
    () => {
      console.log('db is connected')
    },
    (err) => {
      console.log(err)
    }
  )

//session
  app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}))
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('home')
})
// app.post('/geo', (req, res) => {
//   var crd = navigator.geolocation.getCurrentPosition(success, error, options);
//   res.render('home', crd)
// })

app.get('/profile/:slug', (req, res) => {
    User.findOne({
      slug: req.params.slug
    })
    .then((user) => {
      res.render('users/show', {
        user
      })
    })
})

app.use('/register', register_routes)
app.use('/login', login_routes)

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
