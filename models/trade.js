const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcryptjs' );

const TradeSchema = new mongoose.Schema( {

  firstUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  secondUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  firstUserItems: [ { type: mongoose.Schema.Types.ObjectId, ref: "Item" } ],
  secondUserItems: [ { type: mongoose.Schema.Types.ObjectId, ref: "Item" } ],
  dealSweetener: { type: Number }, //convention: positive is first user giving to second user
  firstUserAgreed: Boolean,
  secondUserAgreed: Boolean,
  discussion: String,
} );

const autoPopulate = function( next ) {
  this.populate( 'firstUser' )
    .populate( 'secondUser' )
    .populate( 'firstUserItems' )
    .populate( 'secondUserItems' )
    .populate( 'messages' );
  next();
};

TradeSchema.
pre( 'findOne', autoPopulate ).
pre( 'find', autoPopulate );

module.exports = mongoose.model( 'Trade', TradeSchema );