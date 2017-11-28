const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
  title: String,
  description: String,
  author: String
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
