const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fixedDepositSchema = new Schema({
  name: String,
  bank_img: String,
  annual_interest_rate: String,
  minimum_age: String,
  minimum_deposit: String,
  fees_charges: String,
  link: String
})

const fixedDeposit = mongoose.model('fixed_deposit', fixedDepositSchema)

module.exports = fixedDeposit
