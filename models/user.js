const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt') // for login and register

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: String,
  password: {
    type: String
  }
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
