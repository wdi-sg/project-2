const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcryptjs' );

const TradeSchema = new mongoose.Schema( {

  firstUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  secondUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  firstUserItems: [ { type: mongoose.Schema.Types.ObjectId, ref: "Item" } ],
  secondUserItems: [ { type: mongoose.Schema.Types.ObjectId, ref: "Item" } ],
  dealSweetener: { type: Number }, //in cents, positive means offered by firstUser
  status: {
    type: String,
    enum: [ "ongoing", "finished" ]
  },
  firstUserAgreed: Boolean,
  secondUserAgreed: Boolean,
  messages: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }
} );

module.exports = mongoose.model( 'Trade', TradeSchema );