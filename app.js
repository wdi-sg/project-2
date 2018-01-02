// Dependencies
const path = require('path'); // working with file and directory paths
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const session = require('express-session');
// const methodOverride = require('method-override');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const expressValidator = require('express-validator');
// const server = require('http').createServer(app); // Sockets runs on server, not express
// const io = require('socket.io')(server);
const flash = require('connect-flash');
const passport = require('passport');
const port = process.env.PORT || 3000;

const routes = require('./routes/routes'); // Change to `db-config.js` before commiting to Github
const dbConfig = require('./config/db-config-actual.js');

// Middlewares
mongoose.Promise = global.Promise;
mongoose.connect(
	dbConfig.url, 
	{ useMongoClient: true }).then(
		() => { console.log('>>> Mongoose   Ready <<<'); },
		(err) => { console.log(err) }
);

app.use(cookieParser()); // Read cookies for auth
app.use(bodyParser.json()); // Get information from HTML forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Validator for Express
app.use(expressValidator({
	errorFormatter: (param, msg, value) => {
		let namespace = param.split('.'),
		root = namespace.shift(),
		formParam = root;

		while (namespace.length) {
			formParam += '['+ namespace.shift()+ ']'
		}

		return {
			param: formParam,
			msg: msg,
			value: value
		}
	}
}));


// Routes
app.use('/', routes);

app.listen(port, () => {
	console.log('>>> Server Connected <<<');
});