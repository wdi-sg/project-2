const mongoose = require('mongoose')
const Schema = mongoose.Schema

const componentSchema = new Schema({
  name: String,
  description: String,
  vendor: String,
  unit_cost: Number,
  quantity: Number,
  type: {
    type: Schema.Types.String,
    ref: 'Type'
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

componentSchema.virtual('totalCost').get(function () {
  return this.quantity * this.unit_cost
})

// Use 'components' collection
const Component = mongoose.model('Component', componentSchema)

module.exports = Component
