const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookmarkSchema = new Schema({
  title: String,
  location: String,
  locationUrl: String,
  photo: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewId: {
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }
});


module.exports = mongoose.model('Bookmark', BookmarkSchema);
