const mongoose = require('mongoose')

let participantSchema = new mongoose.Schema({
  event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  joined_at: {type: Date, default: Date.now()}
}).index({event: 1, user: 1}, {unique: true});


// participantSchema.pre('remove', function(next) {
//   console.log('pre REMOVE validation from mongoose', this.user);
//   if (this.user._id.equals(this.event.creator)) {
//     let err = new Error('')
//     return next(err)
//   }
//   next()
// })

let Participant = mongoose.model('Participant', participantSchema)

module.exports = Participant
