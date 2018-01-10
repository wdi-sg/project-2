const mongoose = require('mongoose')
const Schema = mongoose.Schema



const positionSchema = new Schema({
  name: String,
  ticker:  String,
  units: Number,
  price: Number,
  buyDate: String,
  sellDate: String,
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

  if (!position.closingPrice)
  position.closingPrice = position.price
    next()
  })


const Position = mongoose.model('Position', positionSchema)

module.exports = Position