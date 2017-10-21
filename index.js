const express = require('express')
const app = express()
const port = 7000
const dbUrl = 'mongodb://localhost/project-2'

const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const User = require('./models/user')

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

mongoose.Promise = global.Promise
mongoose.connect(dbUrl, { useMongoClient: true })
.then(() => { console.log('db is connected') },
err => console.log(err))

// ///// CODES BEGIN HEREEEEE

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/register', (req, res) => {
  res.render('users/register')
})

app.post('/register', (req, res) => {
  var formData = req.body.user

  var newUser = new User({
    name: formData.name,
    email: formData.email,
    password: formData.password
  })
  newUser.save()
  .then(() => res.redirect('users/login'),
  err => {
    console.log('err')
    res.redirect('users/register')
  })
})

// find user by E-mail first
// if no have send incorrect password re-direct to login page
// if successful, check if password is valid
app.get('/login', (req, res) => {
  res.render('users/login')
})

app.post('/login', (req, res) => {
  var formData = req.body.user

  User.findOne({ email: formData.email })
  .then(user => {
    if (!user) {
      console.log('incorrect email')
      res.redirect('/login')
    }
    user.validPassword(user.password, (err, valid) => {
      if(!valid) {
        console.log('password is incorrect')
        res.redirect('/login')
      }
      console.log('comparison is a match');
      res.redirect('/')
    })
  },
  err => res.send('can\'t access database'))
})

app.listen(port, () => {
  console.log('connected to port 7000 successfully')
})
