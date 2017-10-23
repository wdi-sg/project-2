const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const path = require('path')

const dbUrl = process.env.MONGODB_URI||'mongodb://localhost/GreenieGoGo'
const port = process.env.PORT || 5000

const app = express()

//if you have api
//require('dotenv').config({ silent : true })

//setup handlebars
app.engine('handlebars',exphbs({ defaultLayout:'main' }))
app.set('view engine','handlebars')

//connectting to mongodb before we start the server via mongoose
mongoose.Promise = global.Promise
mongoose.connect(dbUrl,{
  useMongoClient: true
})
.then(
  ()=> {console.log('db is connected')},
  (err) => {console.log(err)}
)

app.get('/',(req,res) => {
  res.render('home')
})

//Register first
app.get('/register',(req,res) => {
  res.render('customers/register')
})

//Login
app.get('/login',(req,res)=> {
  res.render('customers/login')
})


app.listen(port,() =>{
  console.log(`Hello server is running on 5000`);
})
