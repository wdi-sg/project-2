const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
