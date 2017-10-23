const express = require('express')
const app = express()
const port = process.env.PORT || 7000
const dbUrl = 'mongodb://localhost/project-2'

const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
// const session = require('express-session')
// require('dotenv').config({ silent: true })

const home_router = require('./routes/home_router')
const user_login_router = require('./routes/user_login')
const user_register_router = require('./routes/user_register')

// Setting up handlebars engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))
app.use(function (req, res, next) {
  console.log('Method' + req.method + ' Path: ' + req.url)
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true
// }))

mongoose.Promise = global.Promise
mongoose.connect(dbUrl, { useMongoClient: true })
.then(() => { console.log('db is connected') },
err => console.log(err))

// const passport = require('./config/ppConfig')
// app.use(passport.initialize())
// app.use(passport.session())

app.use('/', home_router)
app.use('/register', user_register_router)
app.use('/login', user_login_router)



// ///// CODES BEGIN HEREEEEE /////// ///////

app.listen(port, () => {
  console.log('connected to port 7000 successfully')
})


// git status - make sure nothing to commit 
// heroic create
// change the port to process.env.PORT
// heroic add-on lab // check gitbook for exact command
// change dbURL to process.env.MONGODB_URL
// git push heroic master
