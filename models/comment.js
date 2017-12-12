const mongoose = require("mongoose")
const Schema = mongoose.Schema
const uniqueValidator = require("mongoose-unique-validator")

const commentSchema = new Schema({
  apiId: {
    type: String,
    unique: true
  },
  comment: String,
  author: String
})

commentSchema.plugin(uniqueValidator)
const Book = mongoose.model("Book", commentSchema)

module.exports = Book
