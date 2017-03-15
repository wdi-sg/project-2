const mongoose = require('mongoose')
const MsgSchema = require('../models/msg').schema
require('mongoose-type-url')

const productSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productname: {
    type: String,
    minlength: [3, 'Product name must at least be 3 characters.'],
    required: [true, 'Pls input a product name.']
  },
  linkforproduct: {
    type: mongoose.SchemaTypes.Url,
    required: [true, 'Pls input a URL.'],
    minlength: [10, 'This does not appear to be a correct URL.']
  },
  price: {
    type: Number,
    required: [true, 'We want to know the best price!']
  },
  description: {
    type: String,
    required: [true, 'We want to know more about the product!']
  },
  buyerarea: {
    type: String
  },
  productdatecreated: {
    type: Date,
    default: Date.now
  },
  respondby: {
    type: Date,
    required: [true, 'Let me know how much time I have to think!'],
    validate: ({
      validator: function (val) {
        return this.respondby > this.productdatecreated
      },
      message: 'Respond by date must be later than today.'
    })
  },
  upvote: {
    type: Number
  },
  msgboard: [MsgSchema]
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
