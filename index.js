const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

app.use(express.static('public'))
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended: true}))
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true
//   store: new MongoStore ({
//     url:process.env.MONGODB_URI
//   })
// }))
//app.use(flash)

const homeRoute = require('./routes/homeRoute')
const usersRoute = require('./routes/usersRoute')

app.get('/', function (req, res) {
  res.render('index')
})

app.use('/home', homeRoute)
app.use('/users', usersRoute)

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`express is running on ${port}`)
})
