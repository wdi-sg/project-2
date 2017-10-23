const dbUrl =
process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/test'

const port = process.env.PORT || 9000

const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// initiating express, by calling express variable
const app = express()



// VIEW ENGINES aka handlebars setup
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.get('/', (req, res) =>{
  res.render('home')
})

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
