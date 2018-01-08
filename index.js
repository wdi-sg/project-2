// dependencies
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const port = process.env.PORT || 3000;

const routes = require('./routes/routes');
// const dbConfig = require('./config/dbConfig');
require('dotenv').config();

// database configuration
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI, {useMongoClient: true})
.then(() => {console.log("----Mongoose ok----")}, (err) => {console.log(err)});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// passport
app.use(session({
  secret: 'WDI13project2',
  resave: false,
  saveUnintialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// flash messages middleware
app.use(flash());

app.use((req, res, next) => {
  // passing flash messages to alerts to render in handlebars
  res.locals.alerts = req.flash();
  // console.log(res.locals.alerts);
  // getting the user details obtained through passport
  res.locals.currentUser = req.user;
  // console.log(res.locals.currentUser);
  next();
});

// express validation
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    console.log(param);
    let namespace = param.split('.'),
    root = namespace.shift(),
    formParam = root;

    while(namespace.length) {
      formParam += '['+ namespace.shift() + ']';
    }

    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// routes
app.use('/', routes);

app.listen(port, () => {
  console.log("----App ready----");
});
