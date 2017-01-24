const mongoose = require('mongoose')

let participantSchema = new mongoose.Schema({
  event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  joined_at: {type: Date, default: Date.now()}
}).index({event: 1, user: 1}, {unique: true})

let Participant = mongoose.model('Participant', participantSchema)

module.exports = Participant
