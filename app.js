const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const express = require('express');
const validator = require('express-validator');
const multer = require('multer');
const session = require('express-session');
const messages = require('express-messages');
const PORT = process.env.PORT || 3000;

const app = express();


// =============== local module ===============
const database = require('./config/database');
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
}));


// =============== express messages ===============
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = messages(req, res);
  next();
});


// =============== express validator =============== look into it again ===============
app.use(validator());


// =============== routes ===============
app.use('/', routes);


// =============== mongoose ===============
mongoose.Promise = global.Promise;
mongoose.connect(database.url, {useMongoClient: true}).then(function() {
  console.log('Mongoose running..');
}).catch(function(err) {
  console.log('Error with Mongo', err);
});


// =============== listening port ===============
app.listen(PORT, function() {
  console.log('Node server running...');
});
