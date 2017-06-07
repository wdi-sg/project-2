const express = require( 'express' );
const router = express.Router();
const User = require( '../models/user' );
const passport = require( '../config/passportConfig' );

router.get( '/signup', function( req, res ) {
  res.render( 'auth/signup' );
} );

router.post( '/signup', function( req, res ) {
  User.create( {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  }, function( err, createdUser ) {
    if ( err ) {
      // FLASH -
      req.flash( 'error', err.toString() );
      res.redirect( '/auth/signup' );
    } else {
      // FLASH
      passport.authenticate( 'local', {
        successRedirect: '/interface',
        successFlash: 'Account created and logged in'
      } )( req, res );
    }
  } );
} );

router.get( '/login', function( req, res ) {
  res.render( 'auth/login' );
} );

router.post( '/login', passport.authenticate( 'local', {
  successRedirect: '/interface',
  failureRedirect: '/auth/login',
  failureFlash: 'Login not successful. Please try again or create a new account.'
} ) );

router.get( '/logout', function( req, res ) {
  req.logout();
  console.log( 'logged out' );
  res.redirect( '/' );
} );

module.exports = router;