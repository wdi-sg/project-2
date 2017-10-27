const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listingsSchema = new Schema({
  photos: String,
  title: String,
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  offerId:{
    type: Schema.Types.ObjectId,
    ref: 'Offers'
  },
  dealt: Boolean
})

const Listings = mongoose.model('Listings', listingsSchema)

module.exports = Listings
