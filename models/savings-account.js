const mongoose = require('mongoose')
const Schema = mongoose.Schema

const savingsAccountSchema = new Schema({
  name: String,
  bank_img: String,
  min_interest_rate: Number,
  max_interest_rate: Number,
  minimum_deposit: String,
  fees_charges: String,
  link: String,
  interest_rate: [{
    tier: String,
    rate: Number
  }],
  highlights: [{
    highlight: String,
    comment: String
  }],
  bonus_interest_rates: [{
    bonus: String,
    rate: String
  }]
})

const savingsAccount = mongoose.model('savings_account', savingsAccountSchema)

module.exports = savingsAccount
