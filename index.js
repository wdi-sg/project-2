require('dotenv').config({silent: true})
const dbUrl = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/projecttwo'
const port = process.env.PORT || 5000 // this is for our express server

const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./config/ppConfig')
const { hasLoggedOut, isLoggedIn } = require('./helpers')

const User = require('./models/user')
const Course = require('./models/course')

const login_routes = require('./routes/login_routes')
const register_routes = require('./routes/register_routes')
const classes_routes = require('./routes/classes_routes')
const pending_routes = require('./routes/pending_routes')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

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

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  // the return of then
    res.render('courses/home')
})

app.use('/pending', pending_routes)
app.use('/classes', classes_routes)
app.use('/register', isLoggedIn, register_routes)
app.use('/login', isLoggedIn, login_routes)

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
