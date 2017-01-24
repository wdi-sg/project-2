const mongoose = require('mongoose')

let chatboxSchema = new mongoose.Schema({
  firstuser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  seconduser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  update: {
    type: Date,
    default: Date.now()
  }
}).index({firstuser: 1, seconduser: 1}, {unique: true});

let Chatbox = mongoose.model('Chatbox', chatboxSchema)

module.exports = Chatbox
