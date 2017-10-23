// setup environment
require('dotenv').config({ silent: true })

// setting dburl and port
const dbUrl = process.env.MONGODB_URI|| 'mongodb://localhost/project2'
const port = process.env.PORT || 4000

// installing all modules
const express = require('express') // express
const path = require('path') // for Public files
const mongoose = require('mongoose') // mongoose
const exphbs  = require('express-handlebars') // handlebars
const bodyParser = require('body-parser') // for accessing POST request
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./config/ppConfig')

// models
const User = require('./models/user')

// requiring routes
const register_routes = require('./routes/register_routes')
const login_routes = require('./routes/login_routes')

// initiating express
const app = express()

// view engine setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// static path setup
app.use(express.static(path.join(__dirname, 'public')))

// setup bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// connect to mongodb via mongoose
mongoose.Promise = global.Promise
mongoose.connect(dbUrl, {
  useMongoClient: true
})
.then(
  () => { console.log('Connected to database') },
  (err) => { console.log(err) }
)

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  // store this to our db too
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.render('home')
})

// routes
app.use('/register', register_routes)
app.use('/login', login_routes)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
