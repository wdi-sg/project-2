const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  title: String,
  review: String,
  photo: String,
  location: String,
  date: String,
  like: [String],
  comments: [{
    username: String,
    comment: String
  }],
  rating: {
    quality: Number,
    quantity: Number,
    price: Number,
    overall: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});


module.exports = mongoose.model('Review', ReviewSchema);
