const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quoteSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  quote: {
    type: String,
    required: true,
    unique: true
  },
  timeEvent: Number,
  publishedAt: Date,
  creatorId: String
})

const Quote = mongoose.model('Quote', quoteSchema)

module.exports = Quote
