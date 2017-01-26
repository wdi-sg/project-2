const express = require( 'express' );
const router = express.Router();
const User = require( '../models/user' );
const Item = require( '../models/item' );
const Trade = require( '../models/trade' );

router.post( "/", ( req, res ) => {
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

module.exports = router;