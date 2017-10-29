const mongoose = require('mongoose')
const Schema = mongoose.Schema

var stopSchema = new Schema({
  stopCode: String,
  road: String,
  description: String,
  latitude: Number,
  longitude: Number,
  services: {
    type: [Number]
  } //need direction of bus?
})

const Stop = mongoose.model('Stop', stopSchema)
module.exports = Stop
