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

const login_routes = require('./routes/login_routes')

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
app.post('/route', (req, res) => {
  // console.log('req.body', req.body)
  // console.log('test', req.session.passport.user)
  console.log('req.body.user', (req.body.user).substring(7, 31))
  var _id = (req.body.user).substring(7, 31)

  User.findByIdAndUpdate(_id,
    { startPostal: req.body.postalArray[0],
      endPostal: req.body.postalArray[1]
    },
  { new: true },
  function (err, success) {
    if (err) return console.log(err)
    res.send(success)
  }
)
})

app.use('/users', isLoggedIn, login_routes)

app.get('/route', (req, res) => {
  res.render('map/route')
})

app.get('/logout', hasLoggedOut, (req, res) => {
  req.logout()
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`App listening on server ${port}`)
})
