const mongoose = require('mongoose')
const Schema = mongoose.Schema

const componentSchema = new Schema({
  name: String,
  description: String,
  vendor: String,
  unit_cost: Number,
  quantity: Number,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

// Use 'components' collection
const Component = mongoose.model('Component', componentSchema)

module.exports = Component
