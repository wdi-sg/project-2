const mongoose = require('mongoose')
require('mongoose-type-url')

const commentSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  comment: {
    type: String
  },
  commentdatecreated: {
    type: Date,
    default: Date.now
  }
})

const productSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productname: {
    type: String,
    minlength: [5, 'Product name must at least be 3 characters.'],
    required: [true, 'Pls input a product name.']
  },
  linkforproduct: {
    type: mongoose.SchemaTypes.Url,
    required: [true, 'Pls input a URL.'],
    minlength: [10, 'This does not appear to be a correct URL.']
  },
  price: {
    type: Number
  },
  description: {
    type: String
  },
  buyerarea: { // include required after figured it out
    type: String
  },
  productdatecreated: {
    type: Date,
    default: Date.now
  },
  respondby: {
    type: Date
  },
  commentboard: [commentSchema]
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
