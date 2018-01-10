const path = require('path')
const mongodb = require('mongodb')
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const expressMessages = require('express-messages')
const flash = require('connect-flash')
const session = require('express-session')
const expressValidator = require('express-validator')
const app = express()
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(session({
  secret: 'WINTERMUTE1',
  resave: false,
  saveUninitialized: true
}))

app.engine('handlebars', exphbs({defaultLayout: 'main'})) //This looks for "main.handlebars" in layouts folder in views folder
app.set('view engine', 'handlebars')

// middleware
app.use(bodyParser.json())

//validator for express
app.use(expressValidator({
  errorFormatter : (param, msg, value) => {
      let namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root

        while(namespace.length){
          formParam += '['+ namespace.shift()+ ']'
        }

        return {
          param : formParam,
          msg : msg,
          value : value
        }
    }
}))

//flash messages for express
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error = req.flash('error_msg')
  next();
});

app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, 'public'))); // this means all static files like imgs, css and fonts have to be in a folder called public

//This inits the promise
mongoose.Promise = global.Promise
//Promises return either success(In this case, it's then) or failure(In this case, err)
mongoose.connect(process.env.DB_URI, { useMongoClient : true })
.then(
  ()=>{
    console.log(" -- mongoose ok -- ")
  },
  (err)=>{
    console.log(err)
  }
)

//Routes
const index = require('./routes/routes')

app.use('/', index)


app.listen(port, ()=> {
  console.log(" - -  A p p  r e a d y  - - ")
})
