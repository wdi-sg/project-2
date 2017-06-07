const mongoose = require( 'mongoose' );

const ChangetrackerSchema = new mongoose.Schema( {
  identifier: String,
  usersWithChanges:[ String ] //ids of users with changes
} );

module.exports = mongoose.model( 'Changetracker', ChangetrackerSchema );