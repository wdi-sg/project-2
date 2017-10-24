const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quoteSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  author: String,
  quote: String, // text
  timeEvent: String // TODO: change to Number
  // hasShown: {
  //   type: Boolean,
  //   default: false
  // }
})

const Quote = mongoose.model('Quote', quoteSchema)

module.exports = Quote
