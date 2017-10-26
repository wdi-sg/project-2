const mongoose = require('mongoose')
const Schema = mongoose.Schema


const positionSchema = new Schema({
  name: String,
  ticker:  String,
  inceptionDate: Date,
  units: Number,
  price: Number,
  assetClass: String,
  closingPrice: Number,
  user: [{
  type: Schema.Types.ObjectId,
  ref: 'User'
}]
})

positionSchema.virtual('amountInvested').get(function () {
  return this.price * this.units
})

positionSchema.virtual('currentMarketValue').get(function () {
  if (!this.closingPrice) return this.price * this.units
  return this.closingPrice * this.units
})

positionSchema.pre('save', function(next) {
  var position = this
  // logic to create slug
  if (!position.closingPrice)
  position.closingPrice = position.price
    next() // next() is calling the save()
  })


const Position = mongoose.model('Position', positionSchema)

// make this available to our other files
// remember that technically we're only running index.js
module.exports = Position
