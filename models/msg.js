const mongoose = require('mongoose')

const msgSchema = new mongoose.Schema({
  creatorname: {
    type: String
  },
  comment: {
    type: String
  },
  commentdatecreated: {
    type: Date,
    default: Date.now
  }
})

const Msg = mongoose.model('Msg', msgSchema) // do i need?

// module.exports = msgSchema
module.exports = {
  schema: msgSchema,
  model: Msg
}
