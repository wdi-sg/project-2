const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerSchema = new Schema({
  firstName : {
    type: String, // Title must be a string
    required: true // This field MUST be filled in
  },
  lastName : {
    type: String, // Title must be a string
    required: true // This field MUST be filled in
  },
  roomNumber : {
    type: Number, //price must be a number
    required: true
  },
  passcode : {
    type: Number
    //length must be 4
  },
  tripStart : {
    type: Date
  },
  tripEnd : {
    type: Date
  }

})

const Customer = mongoose.model('Customer', customerSchema)
// cont Book = mongoose.model('Book', bookSchema, "nameOfCollection")
module.exports = Customer
