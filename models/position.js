const mongoose = require('mongoose')
const Schema = mongoose.Schema
const DateOnly = require('mongoose-dateonly')(mongoose)


const positionSchema = new Schema({
  name: String,
  ticker:  String,
  inceptionDate: DateOnly,
  sellDate: DateOnly,
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

// positionSchema.virtual('totalMarketValue').get(function() {
// var total = getTotal(this.amountInvested)
// return parseInt(total)
// })

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
