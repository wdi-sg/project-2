const express = require( 'express' );
const router = express.Router();
const User = require( '../models/user' );
const Item = require( '../models/item' );
const Trade = require( '../models/trade' );
const Message = require( '../models/message' );

//show userHome
router.get( '/', function( req, res ) {
  User.findById( req.user.id )
    .populate( "items" )
    .populate( "trades" )
    .populate( "messages" )
    .exec( ( err, user ) => {
      console.log( user )
      if ( err ) return console.log( err )
      res.render( "user/userHome", {
        user: user
      } );
    } )
} );

//item createForm
router.get( '/item/create', function( req, res ) {
  res.render( "item/createForm" );
} );

//item create
router.post( '/item/create', function( req, res ) {
  req.body._owner = req.user.id;
  Item.create( req.body, ( err, newItem ) => {
    if ( err ) {
      req.flash( 'error', err.toString() );
      res.redirect( '/interface/item/create' )
    }
    User.findById( req.user.id, ( err, user ) => {
      user.items.push( newItem._id );
      user.save();
      res.redirect( "/interface" )
    } )
  } );
} );

//
router.get( '/item/show/:id', function( req, res ) {
  Item.findById( req.params.id, ( err, item ) => {
    console.log( item )
    res.render( "item/viewItem", {
      item: item
    } );
  } );
} );

//show update form
router.get( "/item/edit/:id", ( req, res ) => {
  Item.find( {
    _id: req.params.id,
    _owner: req.user.id
  }, ( err, itemList ) => {
    console.log( itemList )
    res.render( "item/updateForm", {
      item: itemList[ 0 ],
    } )
  } )
} );

//item edit
router.put( "/item/edit/:id", ( req, res ) => {
  Item.findOneAndUpdate( {
    _id: req.params.id,
    _owner: req.user.id
  }, req.body, { new: true, upsert: true, runValidators: true }, ( err ) => {
    if ( err ) {
      req.flash( 'error', err.toString() )
      res.redirect( "/interface/item/edit/" + req.params.id )
    } else res.redirect( "/interface" );
  } );
} );

//item delete
router.delete( '/item/delete/:id', function( req, res ) {
  Item.findOneAndRemove( {
    _id: req.params.id,
    _owner: req.user.id
  }, () => {
    res.redirect( "/interface" )
  } )
} );

//make new trade
router.get( '/trade/create/:itemid', function( req, res ) {
  Item.findById( req.params.itemid, ( err, item ) => {
    console.log(item)
    console.log( "item owner id is", item._owner )
    User.findById( item._owner, ( err, itemOwner ) => {
      Trade.create( {
        firstUser: req.user.id,
        secondUser: itemOwner._id,
        secondUserItems: [ req.params.itemid ]
      }, ( err, newTrade ) => {
        res.render( "trade/viewTrade", {
          trade: newTrade
        } )
      } )
    } )
  } )
} )

module.exports = router;