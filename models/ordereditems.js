const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderedItemsSchema = new Schema({
  customer_id : {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  },
  item_id : {
    type: Schema.Types.ObjectId,
    ref: 'Item'
  },
  quantity : {
    type: Number
  },
  dateOfPurchase : {
    type: String
  }

})

const OrderedItems = mongoose.model('OrderedItems', orderedItemsSchema)
// cont Book = mongoose.model('Book', bookSchema, "nameOfCollection")
module.exports = OrderedItems


//can this form save into customers./
