const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rideSchema = new Schema({
  startPostal: String,
  endPostal: String,
  arrTime: Number,
  ride: String
})

const Ride = mongoose.model('Ride', rideSchema)

module.exports = Ride
