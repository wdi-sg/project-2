const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcryptjs' );

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// almost every email regex

const UserSchema = new mongoose.Schema( {
name: {
  type: String,
  minlength: [ 5, 'Please give a name with more than 5 characters' ],
  maxlength: [ 30, 'Please give a name with less than 30 characters' ],
},
email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  match: [ emailRegex, 'Your email is not recognised as valid, please use another email address' ]
},
password: {
  type: String,
  required: true,
  minlength: [ 8, 'Please use a password with more than 7 characters' ],
},
items: [ { type: mongoose.Schema.Types.ObjectId, ref: "Item" } ],
trades: [ { type: mongoose.Schema.Types.ObjectId, ref: "Trade" } ],

} );

UserSchema.pre( 'save', function( next ) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if ( !user.isModified( 'password' ) ) next();

  //hash the password
  const hash = bcrypt.hashSync( user.password, 10 );

  // Override the cleartext password with the hashed one
  user.password = hash;
  next();
} );

UserSchema.methods.validPassword = function( password ) {
  // Compare is a bcrypt method that will return a boolean,
  return bcrypt.compareSync( password, this.password );
};

UserSchema.options.toJSON = {
  // delete password when user doc goes through toObject
  transform: function( doc, ret ) {
    delete ret.password;
    return ret;
  }
};
UserSchema.options.toObject = {
  // delete password when user doc goes through toObject
  transform: function( doc, ret ) {
    delete ret.password;
    return ret;
  }
};

module.exports = mongoose.model( 'User', UserSchema );