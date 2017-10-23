const exphbs = require("express-handlebars")
const express = require("express")
const path = require("path")
const bodyParser = require('body-parser')
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)


const dbUrl =
process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/project'
const port = process.env.PORT || 3500
const app = express()
require("dotenv").config({silent: true})

//======= initialize mongoose connection
const mongoose = require('mongoose')
mongoose.connect(dbUrl , {
  useMongoClient: true
})
mongoose.Promise = global.Promise //allows us to use .then
//======= Set up handlebars
app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')
// ====== Set up path
app.use(express.static(path.join(__dirname, 'public')))
//======== set Local user variable
app.use((req,res,next)=>{
  app.locals.user = req.user ? req.user : null
  next()
})

// ===== ROUTE ACCESS ===== //


app.get("/",(req,res)=>{
  res.send("Testing home page")
})




//Run port access
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
