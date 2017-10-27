const mongoose = require('mongoose')
const Schema = mongoose.Schema

const offerSchema = new Schema({
  photos: String,
  title: String,
  description: String,
  offerId: {
    type: Schema.Types.ObjectId,
    ref: 'Listings'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Offers = mongoose.model('Offers', offerSchema)

module.exports = Offers
