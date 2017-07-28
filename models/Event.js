const mongoose = require('mongoose')
const Schema = mongoose.Schema

var eventSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  dateTime: {
    type: String,
    required: [true, 'Date and Time required']
  },
  imgUrl: {
    type: String
  },
  eventUrl: {
    type: String,
    required: [true, 'Event link required']
  }
})


const Event = mongoose.model('Event', eventSchema)

module.exports = Event
