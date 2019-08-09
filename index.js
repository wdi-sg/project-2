const dotenv = require('dotenv').config({silent: true})
const express = require('express')
const app =express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('./config/ppConfig')
const path = require('path')

//helper files
const { hasLoggedOut, isLoggedIn } = require('./helpers')

const dbUrl = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/project2'
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 4000 // this is for our express server

//setup engines for handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))
app.use(function (req, res, next) {
  console.log('Method: ' + req.method + ' Path: ' + req.url)
  next()
})

// setup bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// setup methodOverride
app.use(methodOverride('_method'))

// connecting to mongodb before we starting the server via mongoose
mongoose.Promise = global.Promise
mongoose.connect(dbUrl, {
  useMongoClient: true
})
.then(
  () => { console.log('db is connected') },
  (err) => { console.log(err) }
)

//after connection
app.use(session({
    secret: process.env.SESSION_SECRET,//hash session data
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

//(below session configuration) activating
app.use(passport.initialize());
app.use(passport.session());//connecting to session

//set local data for all routes
app.use((req, res, next) => {
  app.locals.user = req.user// we'll only `req.user` if we managed to log in
  next()
})

//routes
const login_routes = require('./routes/login_routes')
const register_routes = require('./routes/register_routes')
const profile_routes = require('./routes/profile_routes')
const fridge_routes = require('./routes/fridge_routes')
const task_routes = require('./routes/task_routes')

//register routes

app.use('/login', isLoggedIn, login_routes)
app.use('/register', isLoggedIn, register_routes)
app.use('/profile', hasLoggedOut, profile_routes)
app.use('/fridge', fridge_routes)
app.use('/task', task_routes)

//home page
app.get('/',(req,res)=>{
  res.render('home')
})

//logout routes
app.get('/logout', hasLoggedOut, (req, res) => {
  req.logout()
  res.redirect('/')
})

//opening the port for express
app.listen(port, ()=>{
  console.log(`server is running on ${port}`);
})
