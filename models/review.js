const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
  title: String,
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
