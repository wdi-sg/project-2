const mongoose = require('mongoose')
const Schema = mongoose.Schema

const creditCardSchema = new Schema({
  name: String,
  card_img: String,
  annual_fees_and_rates: [{
    cat: String,
    comment: String
  }],
  eligibility: [{
    nat: String,
    income: String
  }],
  look_out_for: [{
    caution: String
  }],
  highlights: [{
    highlight: String
  }],
  extra_highlights: [{
    extra_highlight: String
  }],
  type: String,
  link: String
})

const creditCard = mongoose.model('credit_card', creditCardSchema)

module.exports = creditCard
