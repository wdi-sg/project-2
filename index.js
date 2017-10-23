const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost/project-2'
const port = process.env.PORT || 8000

// installing all modules
const express = require('express')
const path = require('path') // for Public files
const mongoose = require('mongoose') // for DB
const exphbs = require('express-handlebars') // for Handlebars
const bodyParser = require('body-parser') // for accessing POST request
const methodOverride = require('method-override') // for accessing PUT / DELETE


const User = require('./models/user')
const Location = require('./models/location')


// require route files
const register_routes = require('./routes/register_routes')
const login_routes = require('./routes/login_routes')
const location_routes = require('./routes/location_routes')

// initiating express, by calling express variable
const app = express()

// VIEW ENGINES aka handlebars setup
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// MIDDLEWARES
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

// connecting to mongodb before we starting the server
mongoose.Promise = global.Promise // the formidable Promise, so we can use .then()
mongoose.connect(dbUrl, {
  // this means that technically mongoose use the same technique
  // like MongoClient.connect
  useMongoClient: true
}) // http://mongoosejs.com/docs/connections.html
.then(
  () => { console.log('db is connected') },
  (err) => { console.log(err) }
)

// Homepage
app.get('/', (req, res) => {
  Location.find().limit(10)
  .then(locations => {

    res.render('home', {
      locations
    })
  })
  .catch(err => {
    console.log(err)
  })
})

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

// setup routes
app.use('/register', register_routes)
app.use('/login', login_routes)
app.use('/locations', location_routes)


// opening the port for express
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
