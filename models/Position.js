const mongoose = require('mongoose')
const Schema = mongoose.Schema

const positionSchema = new Schema({
  date: Date,
  quantity: Number,
  price: Number,
  instrument: {
    type: Schema.Types.ObjectId,
    ref: 'Instrument'
  } // need to include square brackets if one-to-one?
})

const Position = mongoose.model('Position', positionSchema)

module.exports = Position
