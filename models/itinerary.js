const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itinerarySchema = new Schema ({
  date : {
    type : Date,
    required : [true, 'Date Required']
  },
  locationName : {
    type : String,
    required : [true, 'Location Required']
  },
  remarks : {
    type : String
  },
  tripId : {
    type : Schema.Types.ObjectId,
    ref : 'Trip'
  }
})

const Itinerary = mongoose.model('itinerary', itinerarySchema)
module.exports = Itinerary
