const mongoose = require("mongoose")
const Schema = mongoose.Schema
const uniqueValidator = require("mongoose-unique-validator")

const bookSchema = new Schema({
  apiId: {
    type: String,
    unique: true
  },
  title: String,
  author: String,
  img: String,
  thumbnail: String,
  publisher: String,
  publishedDate: String,
  description: String
})

bookSchema.plugin(uniqueValidator)
const Book = mongoose.model("Book", bookSchema)

module.exports = Book
