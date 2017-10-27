require('dotenv').config({ silent: true })

const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const User = require('./models/user')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./config/ppConfig')

const { hasLoggedOut, isLoggedIn } = require('./helpers')

const dbUrl = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/project2'
const port = process.env.PORT || 3000

const loginRoutes = require('./routes/login_routes')
const routeRoutes = require('./routes/route_routes')
mongoose.Promise = global.Promise
mongoose.connect(dbUrl, {
  useMongoClient: true
})
.then(
  () => { console.log('db is connected') },
  (err) => { console.log(err) }
)

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  app.locals.user = req.user // we'll only `req.user` if we managed to log in
  next()
})

app.get('/', (req, res) => {
  res.render('home')
})

app.use('/users', isLoggedIn, loginRoutes)
app.use('/route', routeRoutes)

app.get('/logout', hasLoggedOut, (req, res) => {
  req.logout()
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`App listening on server ${port}`)
})
