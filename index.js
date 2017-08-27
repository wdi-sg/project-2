const mongoose = require('mongoose');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const passport = require('./config/passport')
const flash = require('connect-flash');


const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/project-2'

mongoose.Promise = global.Promise
mongoose.connect(url, {
  useMongoClient: true
}).then(
  function () {
    console.log('connected successfully');
  },
  function (err) {
    console.log(err);
  }
);

const app = express();

app.use(session({
  store: new MongoStore({
    url: url
  }),
  secret: 'foo',
  resave: false,
  saveUninitialized: true
}))

app.use(flash());


// initialize passport
app.use(passport.initialize())
// the line below must be AFTER the session setup
app.use(passport.session())

app.use(express.static('public'));
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

const studentsRoute = require('./routes/students_route')
const teachersRoute = require('./routes/teachers_route')

// app.use('/', function (req,res,next) {
//   app.locals.user = req.user
//   next()
// })

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  app.locals.user = req.user
  app.locals.flash = req.flash('msg');
  next();
})

app.get('/', function (req, res) {
    res.render('home/index')
  })

app.use('/students', studentsRoute);
app.use('/teachers', teachersRoute);

app.get('/logout', function (req, res) {
  req.logout()
  req.flash('msg', 'Logged out successfully')
  res.redirect('/')
})

const port = process.env.PORT || 2000  //  IMPORTANT! DONT FORGET TO UNCOMMENT AND MOVE TO THE FRONT
app.listen(port, function () {
  console.log(`express is running on ${port}`);
})
