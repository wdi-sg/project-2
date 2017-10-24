const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a children schemas
const answerSchema = new mongoose.Schema({
  description: { type: String, required: true },
  upVotes: { type: Number, default: 0},
  downVotes: { type: Number, default: 0 },
  totalVotes: { type: Number, default: 0 },
  parent: Schema.Types.ObjectId,
  creator: Schema.Types.ObjectId
})

const Answer = mongoose.model('answers', answerSchema)

// make this available to our other files
module.exports = Answer
