const mongoose = require('mongoose')
const Schema = mongoose.Schema

var voteSchema = new Schema({
  points: Number,
  month: Number,
  comment: String,
  country: {
    type: Schema.Types.ObjectId,
    ref: 'Country'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Vote = mongoose.model('Vote', voteSchema)

module.exports = Vote
