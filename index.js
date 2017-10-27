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
const { LoggedOut, Logged } = require('./helpers')

const User = require('./models/user')
const Course = require('./models/course')
const Student = require('./models/student')
const Review = require('./models/review')

const login_routes = require('./routes/login_routes')
const register_routes = require('./routes/register_routes')
const classes_routes = require('./routes/classes_routes')
const pending_routes = require('./routes/pending_routes')
const show_routes = require('./routes/show_routes')
const course_routes = require('./routes/course_routes')
const student_register_routes = require('./routes/student_register_routes')
const student_login_routes = require('./routes/student_login_routes')
const student_show_routes = require('./routes/student_show_routes')
const course_update_routes = require('./routes/course_update_routes')

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
  app.locals.course = req.course
  app.locals.student = req.student
  if (req.user) {
    app.locals.admin = req.user.type === 'admin' ? req.user : null
  }
  next()
})

app.get('/', (req, res) => {
  res.render('courses/home')
})

app.get('/profile', hasLoggedOut, (req, res) => {
  res.send(req.user)
})

app.get('/logout', hasLoggedOut, (req, res) => {
  req.logout()
  res.redirect('/')
})

app.get('/profile', LoggedOut, (req, res) => {
  res.send(req.student)
})

app.get('/logout', LoggedOut, (req, res) => {
  req.logout()
  res.redirect('/')
})

app.use('/courseupdate', course_update_routes)
app.use('/studentshow', student_show_routes)
app.use('/studentlogin', student_login_routes)
app.use('/studentregister', student_register_routes)
app.use('/course', course_routes)
app.use('/pending', pending_routes)
app.use('/classes', classes_routes)
app.use('/show', show_routes)
app.use('/register', isLoggedIn, register_routes)
app.use('/login', isLoggedIn, login_routes)

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
