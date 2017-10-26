const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  email: { type: String },
  password: { type: String },
  name: { type: String },
  slug: { type: String },
  addedQuotes: [], // quote ID
  subscribeQuote: {
    type: Boolean,
    default: false
  }
})

userSchema.pre('save', function (next) {
  var user = this
  user.slug = user.name.toLowerCase().split(' ').join('-')

  // skip if user password is not changed
  if (!user.isModified('password')) return next()

  bcrypt.hash(user.password, 10)
  .then(hash => {
    user.password = hash
    console.log('user password is hashed and it\'s saved in mongoose database')
    next()
  })
})

userSchema.methods.validPassword = function (plainPassword, callback) {
  return bcrypt.compare(plainPassword, this.password, callback)
}
const User = mongoose.model('User', userSchema)

module.exports = User
