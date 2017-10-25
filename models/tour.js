const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tourSchema = new Schema({
  // showname: String, //how to join with other database for the show name
  name: String,
  overview: String,
  highlights: String,
  dates: String
})

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour
