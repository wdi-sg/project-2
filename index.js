const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const port = process.env.PORT || 5000 // this is for our express server

const Course = require('./models/course')

const app = express()

app.get('/', (req, res) => {
  // the return of then
  Restaurant.find().limit(9)
  .then(courses => {
    // at this point we got our data so we can render our page

    res.render('home', {
      courses
      // remember object literal on es6, we don't need to type in pairs
      // if key and argument is the same name
      // i.e. restaurants: restaurants
    })
  })
  .catch(err => {
    console.log(err)
  })
})


app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})

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
