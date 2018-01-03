const bodyParser = require('body-parser')
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser');
const passport = require('passport');
const fs = require('fs');

const port = process.env.PORT || 3000

const routes = require('./routes/routes')
const dbConfig = require('./config/dbConfig')

const app = express()

//==================== Config ====================
mongoose.Promise = global.Promise
mongoose.connect(dbConfig.url, {
  useMongoClient: true
}).then (
  () => {
    console.log("-- Mongoose ok --")
  },
  (err) => {
    console.log(err)
  }
)

app.use(cookieParser()) //read cokies (needed for auth)
app.use(bodyParser.json()) //get information from html files
app.use(bodyParser.urlencoded({extended : true}))

app.use(express.static(path.join(__dirname, 'public')))

app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

//==================== Session ====================
app.use(session({
  secret: 'tripcollabsecretsession!!!',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

//==================== Routes ====================
app.use('/',routes)


app.listen(port, () => {
  console.log('---Server Started---')
})
