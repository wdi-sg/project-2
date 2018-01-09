const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  name : {
    type: String, // Title must be a string
    required: true // This field MUST be filled in
  },
  price : {
    type: String, //price must be a number
    required: true
  },
  total_stock : {
    type: Number
  }

})

const Item = mongoose.model('Item', itemSchema)
// cont Book = mongoose.model('Book', bookSchema, "nameOfCollection")
module.exports = Item
