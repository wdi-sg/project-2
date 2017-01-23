const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcryptjs' );

const MessageSchema = new mongoose.Schema( {
  _sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  _receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  string: {
    type: String,
    minLength: [10, "Please enter a message longer than 10 characters"],
    maxLength: [200, "Please enter a message shorter than 200 characters"]
  }
} );

module.exports = mongoose.model( 'Message', MessageSchema );