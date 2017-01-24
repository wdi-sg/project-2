const mongoose = require('mongoose');
//construct ratingSchema here!!!

const ratingSchema = new mongoose.Schema({
  rating : Number,
  whoCreated : { type : mongoose.Schema.Types.ObjectId, ref : 'User'}
})
module.exports = ratingSchema;
