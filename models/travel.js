const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

const travelplanSchema = new Schema({
  title: {
    type: String,
    // required: [true, 'Please give a short title for your issue.']
  },
  address: {
    type: String,
    // required: [true, 'Address not found.']
  },
  latitude: String,
  longitude: String,
  placeId: String,
  category: {
    type: String,
    // required: [true, 'type in the country.']
  },
  dateCreated: {
    type: Date
    // default: Date.now
  },
  postby: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  description: {
    type: String
  },
  picture: {
    type: String
  },
  link: {
    type: String
  }

})

travelplanSchema.virtual('formattedDate').get(function () {
  return moment(this.dateCreated).format('MMMM Do YYYY')
});

const Travelplan = mongoose.model('Travelplan', travelplanSchema)
module.exports = Travelplan
