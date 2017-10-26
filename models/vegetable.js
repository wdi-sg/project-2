const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Admin = require('./admin.js')


const vegSchema = new Schema({
  photo : String,
  name : String,
  quantity : Number,
  price: Number,
  owner : {
    type: Schema.Types.ObjectId,
    ref: 'Admin'
  }
  //  supplier:[{
  //    type: Schema.Types.ObjectId,
  //    ref: 'Supplier'
  //  }]

})
const Vegetable = mongoose.model('vegetable', vegSchema)

module.exports = Vegetable
