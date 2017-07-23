const mongoose = require('mongoose')
const Schema = mongoose.Schema

const positionSchema = new Schema({
  date: Date,
  quantity: Number,
  price: Number
  instrument: [{
    type: Schema.Types.ObjectId,
    ref: 'Instrument'
  }]
})

const Position = mongoose.model('Position', portfolioSchema)

module.exports = Position
