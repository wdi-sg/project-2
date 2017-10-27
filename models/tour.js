const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tourSchema = new Schema({
  showname: String, // how to join with other database for the show name
  name: String,
  slug: String,
  overview: String,
  highlights: String,
  price: String,
  pictureurl1: String,
  pictureurl2: String,
  pictureurl3: String
})

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour
