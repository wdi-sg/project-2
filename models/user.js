const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be between 8 and 99 characters'],
    maxlength: [99, 'Password must be between 8 and 99 characters']
  },
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true
  },
  slug: String,
  startPostal: Number,
  endPostal: Number
})

userSchema.pre('save', function (next) {
  var user = this
  user.slug = user.name.toLowerCase().split(' ').join('-')

  bcrypt.hash(user.password, 10)
  .then(hash => {
    user.password = hash
    console.log('pre save flow', user)
    next()
  })
})

userSchema.methods.validPassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, callback)
}
const User = mongoose.model('User', userSchema)

module.exports = User
