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
const port = 3000;

const routes = require('./routes/routes');
const dbConfig = require('./config/dbConfig');

// database configuration
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.urlLive, {useMongoClient: true})
.then(() => {console.log("----Mongoose ok----")}, (err) => {console.log(err)});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
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
  next();
});

// routes
app.use('/', routes);

app.listen(port, () => {
  console.log("----App ready----");
});
