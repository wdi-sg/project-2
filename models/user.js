const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: {type: Boolean, default: false}
})

userSchema.pre('save', function (next) {
  var user = this
  // hash password
  bcrypt.hash(user.password, 10)
  .then(hash => {
    user.password = hash
    next()
  })
})

// compare passwords
userSchema.methods.validPassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, callback)
}

// Use 'users' collection
const User = mongoose.model('User', userSchema)

module.exports = User
