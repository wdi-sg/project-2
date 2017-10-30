const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const bookSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  author: String,
  description: String
})

bookSchema.plugin(uniqueValidator)
const Book = mongoose.model('Book', bookSchema)

module.exports = Book
