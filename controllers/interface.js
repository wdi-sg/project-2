const express = require( 'express' );
const router = express.Router();
const User = require( '../models/user' );
const Item = require( '../models/item' );
const Trade = require( '../models/trade' );
const Changetracker = require( '../models/changetracker' );
const multer = require( 'multer' );
const cloudinary = require( 'cloudinary' );
const upload = multer( { dest: '../uploads/' } );

//show userHome
router.get( '/', function( req, res ) {
  User.findById( req.user._id )
    .populate( "items" )
    .populate( "trades" ) //subdocument autopopulates
    .exec( ( err, user ) => {
      if ( err ) return console.log( err );
      res.render( "user/userHome", {
        user: user
      } );
    } );
} );

// route to item route/controller
router.use( '/item', require( './item/item' ) );

// router to trade route/controller
router.use( '/trade', require( './trade/trade' ) );

module.exports = router;