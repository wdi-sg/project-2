const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const session = require('express-session')
const expressValidator = require('express-validator')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const path = require('path')
const server = require("http").createServer(app)//sockets
const io = require("socket.io")(server)
const flash = require('connect-flash')
const passport = require('passport')
const port = process.env.PORT || 3000

const routes = require('./routes/routes')
const dbConfig = require('./config/dbConfig')

var AlphaVantageAPI = require('alpha-vantage-cli').AlphaVantageAPI

//method override
app.use(methodOverride('_method'))
//db Configuration
mongoose.Promise = global.Promise
mongoose.connect(dbConfig.url, { useMongoClient : true })
.then(()=>{ console.log("-- Mongoose ok ---")}, (err) =>{ console.log(err) } )

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json())// get information from html forms
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public'))) //Set static path to public
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(session({ secret: 'cogitoergoest', resave: false,
  saveUninitialized: true })); // session secret
//passport
app.use(passport.initialize());
app.use(passport.session());
//express validator
app.use(expressValidator())
//flash messages middleware
// flash messages middleware
app.use(flash());

app.use((req, res, next) => {
  // render alerts in views pages
  res.locals.alerts = req.flash();

  res.locals.currentUser = req.user;

  next();
});

//Routes
app.use('/', routes)



app.listen(port, ()=>{
    console.log('express-connected');
})
