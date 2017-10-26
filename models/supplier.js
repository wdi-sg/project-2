const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Admin = require('./admin.js')
const Vegetable = require('./vegetable.js')

const supplierSchema = new Schema({
  company : String,
  email : String,
  contact : Number,
  address : String,
  unit : String,
  postalcode : Number,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Admin'
  },
   vegetables:[]

})
const Supplier = mongoose.model('supplier', supplierSchema)

module.exports = Supplier
