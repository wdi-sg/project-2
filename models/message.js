const mongoose = require('mongoose')

let messageSchema = new mongoose.Schema({
  content: {
    type: String,
    require: true
  },
  chatbox: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Chatbox',
    require: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    require: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    require: true
  },
  read: {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now()
  }
})


let Message = mongoose.model('Message', messageSchema)

module.exports = Message
