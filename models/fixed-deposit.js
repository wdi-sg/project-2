const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fixedDepositSchema = new Schema({
  name: String,
  bank_img: String,
  interest_rate: [{
    period: Number,
    rate: Number
  }],
  minimum_age: String,
  minimum_deposit: [Number],
  fees_charges: String,
  link: String,
  returns: []
})

const fixedDeposit = mongoose.model('fixed_deposit', fixedDepositSchema)

module.exports = fixedDeposit


// var test = data.filter(e => {
//   if(e.interest_rate['18 months']) return e
// })
//
// console.log(test)

// model
// $exsit or $in
