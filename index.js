// dependencies
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
const yelp = require('yelp-fusion');
const port = 3000;

const routes = require('./routes/routes');
const dbConfig = require('./config/dbConfig');

// database configuration
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.urlLive, {useMongoClient: true})
.then(() => {console.log("----Mongoose ok----")}, (err) => {console.log(err)});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// routes
app.use('/', routes);

app.listen(port, () => {
  console.log("----App ready----");
});
