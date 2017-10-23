require('dotenv').config({silent: true})

// ======= Setup of Dependencies ======= //
const express = require('express')
const exphbs = require('express-handlebars')

const port = process.env.PORT || 3000
const app = express()

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

app.get('/gigs', (req, res) => {
  res.redirect('/')
})

// ======= END: Local port Listen ======= //
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
