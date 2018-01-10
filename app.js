const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const express = require('express');
const expressValidator = require('express-validator');
const multer = require('multer');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session); // https://github.com/jdesboeufs/connect-mongo
const messages = require('express-messages');
const PORT = process.env.PORT || 3000;
const passport = require('./config/passport');
const app = express();
require('dotenv').config();


// =============== local module ===============
// const database = require('./config/database');
const routes = require('./routes/routes');


// =============== middleware ===============
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


// =============== express session ===============
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ url: process.env.DB_URL })
}));


// =============== express validator =============== look into it again ===============
app.use(expressValidator({
customValidators: {
    isImage: function(value, filename) {

        var extension = (path.extname(filename)).toLowerCase();
        switch (extension) {
            case '.jpg':
                return '.jpg';
            case '.jpeg':
                return '.jpeg';
            case  '.png':
                return '.png';
            default:
                return false;
        }
    }
}}));


// =============== passport ===============

app.use(passport.initialize());
app.use(passport.session());


// =============== express messages ===============
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = messages(req, res);
  res.locals.user = req.user || null;
  res.locals.googleApi = process.env.GOOGLE_API;
  next();
});


// =============== routes ===============
app.use('/', routes);


// =============== mongoose ===============
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL).then(function() {
  console.log('Mongoose running..');
}).catch(function(err) {
  console.log('Error with Mongo', err);
});


// =============== listening port ===============
app.listen(PORT, function() {
  console.log('Node server running...');
});
