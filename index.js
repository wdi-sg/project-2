const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./config/passport')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

// if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/project-2')
// } else {
//   mongoose.connect('mongodb://localhost/express-authentication')
// }

app.use(session({
  store: new MongoStore({
    url: 'mongodb://localhost/project-2'
  }),
  secret: 'foo',
  resave: false,
  saveUninitialized: true
}))

app.use(express.static('public'))
app.use(passport.initialize())
app.use(passport.session())
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')

app.get('/', function (req, res) {
  // if (req.user) {
  //   res.render('/')
  //   // return res.send('hide login link')
  // }
  res.render('home')
})

const profileRoute = require('./routes/profile_routes')

app.use('/profile', profileRoute)

const episodeRoute = require('./routes/episode_routes')

app.use('/episode', episodeRoute)

app.get('/logout', function (req, res){
  req.logout()
  res.redirect('/')
})

const authRoutes = require('./routes/auth_routes')

app.use('/', authRoutes)

const port = process.env.PORT || 4000
var server = app.listen(port, function () {
  console.log('express is running on' + port)
})

module.exports = server
