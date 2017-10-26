require('dotenv').config({silent: true})

const dbUrl =
process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/myportfoliomanager_test'
const port = process.env.PORT || 8000 // this is for our express server
const quoteApiKey =process.env.QUOTEAPI

const express = require('express')
const path = require('path') // for Public files
const mongoose = require('mongoose') // for DB
const exphbs = require('express-handlebars') // for Handlebars
const bodyParser = require('body-parser') // for accessing POST request
const methodOverride = require('method-override') // for accessing PUT / DELETE
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('./config/ppConfig')


const User = require('./models/user')

const register_routes = require('./routes/register_routes')
const login_routes = require('./routes/login_routes')
const profile_routes=require('./routes/profile_routes')
const portfolio_routes=require('./routes/portfolio_routes')


const app = express()

// df = quandl.get("FRED/GDP",returns="pandas")
// records = json.loads(df.T.to_json()).values()
// db.myCollection.insert(records)

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
}) // http://mongoosejs.com/docs/connections.html
.then(
  () => { console.log('db is connected') },
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

app.use((req,res,next) => {
  app.locals.user = req.user
  next()
})

app.get('/', (req,res) => {
  res.render('home')
})

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

// app.get('/portfolio', (req,res) => {
//   res.render('portfolio')
// })

app.use('/register', register_routes)

app.use('/login', login_routes)

app.use('/profile', profile_routes)

app.use('/portfolio', portfolio_routes)


app.get('/profile/:slug', (req, res) => {
  // res.send(`this is the profile page for ${req.params.slug}`)
  // findOne method is from mongoose. google it up
  User.findOne({
    slug: req.params.slug
  })
  .then((user) => {
    // UPDATE BEFORE CLASS 20 Oct
    // render a new page with the user data found from the db
    res.render('users/show', {
      user
    })
  }) // if i found the user
})

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
