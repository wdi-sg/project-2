
// BAE = require(`dotenv`)
require('dotenv').config({ silent: true })

// installing all modules
const express = require('express')
const mongoose = require('mongoose') // for DB
const exphbs = require('express-handlebars') // for Handlebars
const bodyParser = require('body-parser') // for accessing POST request

// initiating express, by calling express variable
const app = express()

// VIEW ENGINES aka handlebars setup
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// 23 Oct. check if you're in Heroku or not
const dbUrl =
process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/itinerary'
const port = process.env.PORT || 4000 // this is for our express server

app.get('/', (req, res) => {
  res.send(`hello, server successfully connected`)
})

// opening the port for express
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
