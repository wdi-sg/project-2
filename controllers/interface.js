const express = require( 'express' );
const router = express.Router();
const User = require( '../models/user' );
const Item = require( '../models/item' );
const Trade = require( '../models/trade' );

//show userHome
router.get( '/', function( req, res ) {
  User.findById( req.user._id )
    .populate( "items" )
    .populate( "trades" ) //subdocument autopopulates
    .exec( ( err, user ) => {
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
  req.body._owner = req.user._id;
  Item.create( req.body, ( err, newItem ) => {
    if ( err ) {
      req.flash( 'error', err.toString() );
      res.redirect( '/interface/item/create' )
      return;
    }
    User.findById( req.user._id, ( err, user ) => {
      user.items.push( newItem._id );
      user.save();
      res.redirect( "/interface" )
    } )
  } );
} );

//view item details
router.get( '/item/show/:id', function( req, res ) {
  Item.findById( req.params.id, ( err, item ) => {
    console.log( item )
    res.render( "item/viewItem", {
      item: item
    } );
  } );
} );

//show item update form
router.get( "/item/edit/:id", ( req, res ) => {
  Item.find( {
    _id: req.params.id,
    _owner: req.user._id
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
    _owner: req.user._id
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
    _owner: req.user._id
  }, () => {
    res.redirect( "/interface" )
  } )
} );

//make new trade
router.post( '/trade/create/:itemid', function( req, res ) {
  Item.findById( req.params.itemid, ( err, item ) => {
    User.findById( item._owner, ( err, itemOwner ) => {
      Trade.create( {
        firstUser: req.user._id,
        secondUser: itemOwner._id,
        secondUserItems: [ req.params.itemid ]
      }, ( err, newTrade ) => {
        //add trade to currentUser
        User.findById( req.user._id, ( err, user ) => {
          user.trades.push( newTrade._id );
          user.save();
          //add trade to owner of target item
          itemOwner.trades.push( newTrade._id );
          itemOwner.save();
          //record in item status that item is in a trade
          item._trade = newTrade._id
          item.save();
          Trade.findById( newTrade._id )
            .exec( ( err, trade ) => {
              req.flash( "success",
                "New trade has been created with the item desired"
              )
              res.redirect( "/interface/trade/edit/" +
                newTrade._id )
            } )
        } )
      } )
    } )
  } )
} )

//delete trade
router.delete( '/trade/delete/:tradeid', function( req, res ) {
  Trade.findById( req.params.tradeid, ( err, trade ) => {
    User.findById( trade.firstUser, ( err, firstUser ) => {
      let tradeIndex = firstUser.trades.indexOf( trade._id )
      firstUser.trades.splice( tradeIndex, 1 );
      firstUser.save();
      User.findById( trade.secondUser, ( err, secondUser ) => {
        let tradeIndex = secondUser.trades.indexOf( trade._id )
        secondUser.trades.splice( tradeIndex, 1 );
        secondUser.save();
        //remove trade from items, no callback or error check
        trade.firstUserItems.forEach( ( itemid ) => {
          Item.findById( itemid, ( err, item ) => {
            item._trade = null
            item.save()
          } )
        } )
        trade.secondUserItems.forEach( ( itemid ) => {
          Item.findById( itemid, ( err, item ) => {
            item._trade = null
            item.save()
          } )
        } )
        Trade.findOneAndRemove( { _id: trade._id }, () => {
          res.redirect( "/interface" )
        } )
      } )
    } )
  } );
} );

//view trade
router.get( '/trade/edit/:tradeid', function( req, res ) {
  Trade.findById( req.params.tradeid, ( err, trade ) => {
    if ( err ) {
      req.flash( "error", err.toString )
      res.redirect( "/interface" )
    }
    res.render( "trade/viewTrade", {
      trade: trade
    } )
  } )
} )

//show form for adding another offered item (from user inventory)
router.get( '/trade/add/offered/:tradeid', function( req, res ) {
  User.findById( req.user._id )
    .populate( "items" )
    .exec( ( err, user ) => {
      res.render( "trade/addItemToOfferForm", {
        tradeid: req.params.tradeid,
        itemsList: user.items
      } )
    } )
} )

//add item from own inventory to offered items in trade 
router.post( '/trade/add/offered/:tradeid/:itemid', function( req, res ) {
  Trade.findById( req.params.tradeid, ( err, trade ) => {
    //check which array in the trade to add item to
    if ( req.user._id.toString() === trade.firstUser._id.toString() ) {
      trade.firstUserItems.push( req.params.itemid );
    } else {
      trade.secondUserItems.push( req.params.itemid );
    }
    trade.save();
    Item.findById( req.params.itemid, ( err, item ) => {
      if ( item._trade ) {
        req.flash( "error",
          "item already in trade, please pick another" );
        res.redirect( "/interface/trade/edit/" + req.params.tradeid );
        return;
      } else {
        item._trade = trade._id;
        item.save();
        req.flash( "success", "Item added from your inventory." )
        res.redirect( "/interface/trade/edit/" + req.params.tradeid );
        return;
      }
    } )
  } )
} )

//show form for adding another desired item (from trade partner's inventory)
router.get( '/trade/add/desired/:tradeid/:partnerid', function( req, res ) {
  User.findById( req.params.partnerid )
    .populate( "items" )
    .exec( ( err, user ) => {
      res.render( "trade/addItemFromTradePartnerForm", {
        tradeid: req.params.tradeid,
        itemsList: user.items
      } )
    } )
} )

//add item from trade partner's inventory to desired items in trade
router.post( '/trade/add/desired/:tradeid/:itemid', function( req, res ) {
  Trade.findById( req.params.tradeid, ( err, trade ) => {
    //check which array in the trade to add item to
    if ( req.user._id.toString() === trade.firstUser._id.toString() ) {
      trade.secondUserItems.push( req.params.itemid );
    } else {
      trade.firstUserItems.push( req.params.itemid );
    }
    trade.save();
    Item.findById( req.params.itemid, ( err, item ) => {
      if ( item._trade ) {
        req.flash( "error",
          "item already in trade, please pick another" );
        res.redirect( "/interface/trade/edit/" + req.params.tradeid );
        return;
      } else {
        item._trade = trade._id;
        item.save();
        req.flash( "success",
          "Item added from trade partner's inventory." )
        res.redirect( "/interface/trade/edit/" + req.params.tradeid );
        return;
      }
    } )
  } )
} )

//remove item from trade
router.delete( '/trade/delete/:tradeid/:itemid', function( req, res ) {
  Trade.findById( req.params.tradeid, ( err, trade ) => {
    trade.firstUserItems.forEach( ( item, idx ) => {
      if ( item._id.toString() === req.params.itemid.toString() ) {
        trade.firstUserItems.splice( idx, 1 )
        trade.save()
      }
    } )
    trade.secondUserItems.forEach( ( item, idx ) => {
      if ( item._id.toString() === req.params.itemid.toString() ) {
        trade.secondUserItems.splice( idx, 1 )
        trade.save()
      }
    } )
    Item.findById( req.params.itemid, ( err, item ) => {
      console.log( "item found by item findbyid:", item )
      item._trade = null;
      item.save();
      res.redirect( "/interface/trade/edit/" + req.params.tradeid );
    } )
  } )
} )

//add agreement to trade
router.post( '/trade/agreedby/:tradeid/:userid', function( req, res ) {
  Trade.findById( req.params.tradeid, ( err, trade ) => {
    if ( trade.firstUser._id.toString() === req.params.userid.toString() ) {
      trade.firstUserAgreed = true
      trade.save()
    } else {
      trade.secondUserAgreed = true
      trade.save()
    }
    if ( trade.firstUserAgreed === true &&
      trade.secondUserAgreed === true ) {
      let allItems = trade.firstUserItems.concat( trade.secondUserItems )
      allItems.forEach( ( item ) => {
        Item.findById( item._id, ( err, item ) => {
          item.tradedaway = true;
          item.save()
        } )
      } )
    }
    res.redirect( "/interface/trade/edit/" + req.params.tradeid );
  } )
} )

//remove agreement from trade
router.post( '/trade/cancelagreedby/:tradeid/:userid', function( req, res ) {
  Trade.findById( req.params.tradeid, ( err, trade ) => {
    if ( trade.firstUser._id.toString() === req.params.userid.toString() ) {
      trade.firstUserAgreed = false
      trade.save()
    } else {
      trade.secondUserAgreed = false
      trade.save()
    }
    res.redirect( "/interface/trade/edit/" + req.params.tradeid );
  } )
} )

//add text to chat
router.post( '/trade/addchat/:tradeid', function( req, res ) {
  User.findById( req.user._id, ( err, user ) => {
    Trade.findById( req.params.tradeid, ( err, trade ) => {
      if ( !trade.discussion ) trade.discussion = ""
      trade.discussion =
        trade.discussion + "<br>" + user.name + ": " + req.body.chattext;
      trade.save();
      res.redirect( "/interface/trade/edit/" + trade._id )
    } );
  } );
} );

//change sweetener in trade
router.post( '/trade/changesweetener/:tradeid', function( req, res ) {
  User.findById( req.user._id, ( err, user ) => {
    Trade.findById( req.params.tradeid, ( err, trade ) => {
      sweetener = req.body.sweetenerValue;
      //default is give, if take then flip value
      if ( req.body.sweetenerDirection === "take" )
        sweetener = -sweetener
      //default is firstuser, if seconduser then flip value
      if ( req.user._id.toString() === trade.secondUser._id.toString() )
        sweetener = -sweetener
      trade.dealSweetener = sweetener
      trade.save();
      res.redirect( "/interface/trade/edit/" + trade._id )
    } );
  } );
} );

module.exports = router;