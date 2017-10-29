//Phase 2 only- use to search by bus, to display stops

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var busServiceSchema = new Schema({
  //stores the bus num, and the stops it goes to.
  busService: String,
  stops: {
    type: [String]
  } //need direction of bus?
})

const BusService = mongoose.model('BusService', busServiceSchema)
module.exports = BusService
