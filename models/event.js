const mongoose = require('mongoose')

let eventSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: [5, 'Name of the event must be atleast 5 characters.']
  },
  startDate: {
    type: Date,
    require: true,
    min: Date.now()
  },
  endDate: {
    type: Date,
    require: true,
    min: Date.now()
  },
  location: {
    type: String,
    require: true
  },
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  created_at: {type: Date, default: Date.now()}
})

eventSchema.pre('save', function (next) {
  let event = this

  if (event.endDate < event.startDate) {
    let err = new Error('Could not end an event before it started')
    return next(err)
  }

  next()
})

let Event = mongoose.model('Event', eventSchema)

module.exports = Event
