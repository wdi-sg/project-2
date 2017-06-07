const express = require( 'express' );
const router = express.Router();
const User = require( '../../models/user' );
const Item = require( '../../models/item' );
const Trade = require( '../../models/trade' );
const Changetracker = require( '../../models/changetracker' );
const multer = require( 'multer' );
const cloudinary = require( 'cloudinary' );
const upload = multer( { dest: './uploads/' } );

//item createForm
router.get( '/create', function( req, res ) {
  res.render( "item/createForm" );
} );

//item create
router.post( '/create', upload.single( 'imageFile' ), function( req, res ) {
  if ( req.file ) {
    // make item listing with image
    cloudinary.uploader.upload( req.file.path, function( cloudinaryData ) {
      req.body.imagelink = cloudinaryData.secure_url;
      req.body.imagePublicId = cloudinaryData.public_id;
      req.body._owner = req.user._id;
      Item.create( req.body, ( err, newItem ) => {
        if ( err ) {
          req.flash( 'error', err.toString() );
          res.redirect( '/interface/item/create' );
          return;
        }
        User.findById( req.user._id, ( err, user ) => {
          user.items.push( newItem._id );
          user.save();
          res.redirect( "/interface" );
        } );
      } );
    } );
  } else {
    //make item listing without image
    req.body._owner = req.user._id;
    Item.create( req.body, ( err, newItem ) => {
      if ( err ) {
        req.flash( 'error', err.toString() );
        res.redirect( '/interface/item/create' );
        return;
      }
      User.findById( req.user._id, ( err, user ) => {
        user.items.push( newItem._id );
        user.save();
        res.redirect( "/interface" );
      } );
    } );
  }
} );

//view item details
router.get( '/show/:id', function( req, res ) {
  Item.findById( req.params.id, ( err, item ) => {
    console.log( item );
    res.render( "item/viewItem", {
      item: item
    } );
  } );
} );

//show item update form
router.get( "/edit/:id", ( req, res ) => {
  Item.find( {
    _id: req.params.id,
    _owner: req.user._id
  }, ( err, itemList ) => {
    res.render( "item/updateForm", {
      item: itemList[ 0 ],
    } );
  } );
} );

//item edit
router.put( "/edit/:id", upload.single( 'imageFile' ), ( req, res ) => {
  function updateAndRedirect() {
    Item.findOneAndUpdate( {
        _id: req.params.id,
        _owner: req.user._id
      }, req.body, {
        new: true,
        upsert: true,
        runValidators: true
      },
      ( err ) => {
        if ( err ) {
          req.flash( 'error', err.toString() );
          res.redirect( "/interface/item/edit/" + req.params
            .id );
        } else res.redirect( "/interface" );
      } );
  }

  if ( req.file ) { //if upload middleware succeeded, basically
    // edit with new image
    Item.findById( req.params.id, ( err, item ) => {
      cloudinary.uploader.destroy( item.imagePublicId, () => {
        cloudinary.uploader.upload(
          req.file.path, ( cloudinaryData ) => {
            req.body.imagelink = cloudinaryData.secure_url;
            req.body.imagePublicId = cloudinaryData.public_id;
            updateAndRedirect();
          } );
      } );
    } );
  } else {
    //edit keeping old image
    updateAndRedirect();
  }
} );

//item delete 
router.delete( '/delete/:id', function( req, res ) {
  Item.findById( req.params.id, ( err, item ) => {
    cloudinary.uploader.destroy( item.imagePublicId, ( result ) => {
      console.log( "cloudinary destroy result:", result );
      Item.findOneAndRemove( {
        _id: req.params.id,
        _owner: req.user._id
      }, () => {
        res.redirect( "/interface" );
      } );
    } );
  } );
} );

module.exports = router;