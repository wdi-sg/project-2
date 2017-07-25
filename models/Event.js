const mongoose = require('mongoose')
const Schema = mongoose.Schema

var eventSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  reference: String
})

// mongoose.model(<singular form of model>, <schemaName>)
const Event = mongoose.model('Event', eventSchema)

module.exports = Event
