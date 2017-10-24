const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const User = require('./models/user')
const bodyParser = require('body-parser')
const path = require('path')

const dbUrl = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/project2'
const port = process.env.PORT || 3000

mongoose.connect(dbUrl, {
  useMongoClient: true
})
.then(
  () => { console.log('db is connected') },
  (err) => { console.log(err) }
)
mongoose.Promise = global.Promise

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/users/register', (req, res) => {
  res.render('users/register')
})

app.get('/route', (req, res) => {
  res.render('map/route')
})

app.post('/users/register', (req, res) => {
  var formData = req.body
  var newUser = new User({
    name: formData.name,
    email: formData.email,
    password: formData.password
  })

  newUser.save()
  .then(
    user => res.redirect('/'),
    err => res.send(err)
  )
})
app.listen(port, () => {
  console.log(`App listening on server ${port}`)
})
