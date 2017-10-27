const mongoose = require('mongoose')
const Schema = mongoose.Schema

const savingsAccountSchema = new Schema({
  name: String,
  bank_img: String,
  min_interest_rate: [Number],
  max_interest_rate: [Number],
  minimum_deposit: String,
  fees_charges: String,
  link: String,
  interest_rates: [{String}],
  highlights: [{String}],
  bonus_interest_rates: [{String}],
  owner: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

const fixedDeposit = mongoose.model('savings-account', savingsAccountSchema)

module.exports = fixedDeposit
