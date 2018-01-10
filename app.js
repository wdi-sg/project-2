// Module Dependencies ==========================================================================
const bodyParser = require('body-parser') // read the form, access POST requests
const cookieParser = require('cookie-parser') // read cookie file for auth
const express = require('express')
const app = express() // init App
const session = require('express-session') // connect flash to display message (encrypt)
const expressValidator = require('express-validator') // validate form
const methodOverride = require('method-override'); // access PUT / DELETE

const mongoose = require('mongoose') // write to database using schema
const exphbs = require('express-handlebars')
const path = require('path') // working with public file and directory path



// const dogsCtrl = require("./controllers/dogs")
// app.use("/dogs", dogsCtrl);


// Set Port ======================================================================================
const flash = require('connect-flash')
const passport = require('passport')
const port = process.env.PORT || 3013

const dbConfig = require('./config/dbConfig')

// Models - Routes
const routes = require('./routes/routes')   // const is defined, cannot be re-assigned

// Configuration ================================================================================

// ----- Connect to Database -----
mongoose.Promise = global.Promise
mongoose.connect(dbConfig.url, {
  useMongoClient : true }).then(() => {
    console.log("-- Mongoose ok ---")},
    (err) => { console.log(err) });


// ------ Set Up Express Application / Body-Parser Middleware -----
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json())// get information from html forms
app.use(bodyParser.urlencoded({ extended: true }))


// ----- Set Static Path to Public Folder / View Engine -----
app.use(express.static(path.join(__dirname, 'public')));  // Store all HTML in view folders
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// ----- Express Session -----
app.use(session({
    secret: 'pp2',
    resave: false,
    saveUninitialized: true
  }));


// ----- Passport -----
app.use(passport.initialize());
app.use(passport.session());


// ----- Connect Flash For Flash Messages Stored In Session -----
app.use(flash());


// Global Variances ==============================================================================
app.use((req, res, next) => {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next();
  });



// Express Validator ==============================================================================
app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        let namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }

      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

  app.use(methodOverride('_method'));


// Routes ==================================================================================
app.use('/', routes);

app.listen(port, () => {
  console.log('express-connected');
})
