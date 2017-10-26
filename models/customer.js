const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')

const customerSchema = new Schema({
  name: String,
  email: String,
  business: String,
  password: String,
  slug: String,
  type: String
})

customerSchema.pre('save', function (next) {
  var customer = this
  customer.slug = customer.name.toLowerCase().split(' ').join('-')

  bcrypt.hash(customer.password, 10)
  .then(hash => {
    customer.password = hash
    console.log('pre save flow', customer)
    next()
  })
})

customerSchema.methods.validPassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, callback)
}

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer
