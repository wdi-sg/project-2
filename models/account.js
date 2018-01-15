const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accountSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  fd: {
    type: Schema.Types.ObjectId,
    ref: 'fixed_deposit'
  },
  sa: {
    type: Schema.Types.ObjectId,
    ref: 'savings_account'
  },
  amount: Number,
  period: Number,
  returns: Number
})

const Account = mongoose.model('account', accountSchema)

module.exports = Account
