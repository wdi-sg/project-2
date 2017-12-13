const mongoose = require("mongoose")
const Schema = mongoose.Schema
const uniqueValidator = require("mongoose-unique-validator")

const commentSchema = new Schema({
  book_id: {
    type: Schema.Types.ObjectId,
    ref: "Book"
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  comment: String
})

commentSchema.plugin(uniqueValidator)
const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment
