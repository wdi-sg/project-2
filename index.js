require('dotenv').config({silent: true})

// ======= Setup of Dependencies ======= //
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const dbUrl = 'mongodb://localhost/MakeGood'
const port = process.env.PORT || 3000
const app = express()

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

// ======= Setup of Routes ======= //
const signupRoutes = require('./routes/signup_routes')
const gigsRoutes = require('./routes/gigs_routes')

// ======= Setup of main GET reqs ======= //
/* Using handlebars template engine */
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('gigs-search')
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/peeps', (req, res) => {
  res.render('peeps-search')
})

// ======= Use Routes ======= //
app.use('/signup', signupRoutes)
app.use('/gigs', gigsRoutes)

// ======= END: Local port Listen ======= //
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
