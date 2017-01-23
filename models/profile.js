const mongoose = require('mongoose');
const ratingSchema = require('./rating');

const ProfileSchema = new mongoose.Schema({
  description : {
    type : String,
    maxlength : [99, 'description cannot be more than 99 characters!!']
  },
  avatar : Buffer,
  // ratings : [ratingSchema],
  user : { type : mongoose.Schema.Types.ObjectId, ref:'User'}
})

module.exports = mongoose.model('Profile', ProfileSchema);
