const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = {
  Schema: CommentSchema,
  model: Comment
}