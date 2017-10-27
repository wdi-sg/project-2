const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be between 6 and 99 characters'],
    maxlength: [99, 'Password must be between 8 and 99 characters']
  },
  name: {
    type: String,
    required: true,
    minlength: [3, 'Name must be between 3 and 99 characters'],
    maxlength: [99, 'Name must be between 3 and 99 characters']
  },
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
