const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  title: String,
  review: String,
  photo: String,
  location: String,
  date: String,
  like: [String],
  comment: [{
    username: String,
    comment: String
  }],
  rating: {
    quality: Number,
    quantity: Number,
    price: Number,
    total: Number
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});


module.exports = mongoose.model('Review', ReviewSchema);

// search for location on map
// https://www.google.com/maps/search/?api=1&query=
