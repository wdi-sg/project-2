const mongoose = require('mongoose')
const Schema = mongoose.Schema

var tripSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  dates: [{
    date: String,
    places: [{
      type: Schema.Types.ObjectId,
      ref: 'Place'
    }]
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Trip = mongoose.model('Trip', tripSchema)

module.exports = Trip
