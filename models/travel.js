const mongoose = require('mongoose')
const Schema = mongoose.Schema

const travelplanSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please give a short title for your issue.']
  },
  address: {
    type: String,
    required: [true, 'Address not found.']
  },
  catergory: {
    type: String,
    required: [true, 'type in the country.']
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  postby: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  description: {
    type: String
  }

})

const Travelplan = mongoose.model('Travelplan', travelplanSchema)
module.exports = Travelplan
