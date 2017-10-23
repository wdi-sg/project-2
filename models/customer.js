const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrpt = require('bcrypt')

const customerSchema = new Schema({
  //customer id :
  name : String,
  address : String,
  email : String,
  password : String,
  slug : String
})

customerSchema.pre('save', function(next){
  var customer = this
  customer.slug = customer.name.toLowerCase().split(' ').join('-')
})


  bcrypt.hash(user.password, 10)
  .then(hash => {
    customer.password = hash
    console.log('pre save flow',customer);
    next()
  })

  customerSchema.methods.validPassword = function(plainPassword,callback){
    bcrypt.compare(plainPassword, this.password,callback)
  }
  const Customer = mongoose.model('Customer', customerSchema)

  module.exports = Customer
