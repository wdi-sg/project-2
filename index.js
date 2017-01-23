require( 'dotenv' ).config( { silent: true } );
const mongoose = require( 'mongoose' );
if ( process.env.NODE_ENV === "test" ) {
  console.log( "Test mode: using test db, debug and morgan logger" )
  mongoose.connect( 'mongodb://localhost/barterFly-test' )
  var debug = require( "debug" );
  var logger = require( "morgan" );
} else {
  mongoose.connect( 'mongodb://localhost/barterFly' )
};
mongoose.Promise = global.Promise;

const express = require( "express" );
const app = express();

const session = require( 'express-session' );

const ejsLayouts = require( 'express-ejs-layouts' );

const methodOverride = require( 'method-override' );

const bodyParser = require( "body-parser" );

const flash = require( 'connect-flash' );

const passport = require( './config/passportConfig' );

// const todosWWWController = require( './controllers/todos_www_controller' );

//custom middleware blocks route or path down route stack if not logged in
const isLoggedIn = require( './middleware/isLoggedIn' );

const Interface = require('./controllers/interface');

const Item = require( './models/item' );

app.set( "view engine", "ejs" );
app.use( ejsLayouts );

app.use( session( {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
} ) );

// MUST BE BELOW app.use(session)
app.use( passport.initialize() );
app.use( passport.session() );

//MUST BE BELOW app.use(session)
app.use( flash() );

// autologin attempt, not working 
// app.use( function( req, res, next ) {
//   if ( !req.user ) {
//     req.body = {}
//     req.body.email = "adrianke77@gmail.com"
//     req.body.password = "password"
//     console.log("trying to autologin")
//     passport.authenticate( 'local', {
//       successRedirect: '/',
//       successFlash: 'autologin succeeded',
//       failureFlash: "autologin failed"
//     } )(req,res,next)
//   };
//   next();
// } );

app.use( function( req, res, next ) {
  // before every route, attach the flash messages and current user to res.locals
  // for viewing in partial
  res.locals.alerts = req.flash(); // for alerts
  res.locals.currentUser = req.user; // for providing views with user info
  next();
} );

app.use( function( req, res, next ) {
  // makes req.safeUserData, which is req.user with no password
  if ( req.user ) {
    let userData = Object.create( req.user );
    userData.password = "hidden";
    req.safeUserData = userData;
  }
  next();
} );

if ( process.env.NODE_ENV === "test" ) {
  app.use( logger( "dev" ) );
  app.use( require( 'morgan' )( 'dev' ) );
}

// add public access to public folder
app.use( '/public', express.static( __dirname + '/public' ) );

//put in form tag: action="/resource?_method=DELETE" (for a delete)
app.use( methodOverride( '_method' ) )

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );


app.get( "/", ( req, res ) => {
  res.render( "user/landing" );
} );

// authorization router
app.use( '/auth', require( './controllers/auth' ) );

//search and browse items
app.post( "/itemSearch", ( req, res ) => {
  userid = null;
  if ( req.user ) userid = req.user.id
  let searchRegex = ".*" + req.body.search + ".*"
  Item.find( {
    _owner: { $ne: userid },
    description: { $regex: searchRegex, $options: 'i' }
  }, ( err, itemsList ) => {
    res.render( "searchView", { itemsList: itemsList } )
  } )
} )

// block routes below this line unless logged in
app.use( isLoggedIn );

// route to WWW user interface
app.use( "/interface", Interface );

// route to user details
app.get( "/profile", function( req, res ) {
  res.render( "user/userProfile", { user:req.user } );
} );

// spin up server to port
if ( process.env.NODE_ENV === "test" ) {
  app.listen( 3000 );
} else
  app.listen( process.env.PROD_PORT )

module.exports = app;