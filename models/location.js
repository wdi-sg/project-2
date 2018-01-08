const mongoose = require('mongoose');
const Schema = mongoose.Schema

const locationSchema = new Schema ({
  locationName : {
    type : String
  },
  latitue : {
    type : Number
  },
  longitude : {
    type : Number
  },
  tripId : {
    type : Schema.Types.ObjectId,
    ref : 'Trip'
  }
})

const Location = mongoose.model('location', locationSchema)
module.exports = Location
