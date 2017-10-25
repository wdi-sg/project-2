const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }
})

userSchema.pre('save', function(next) {
  var user = this

  bcrypt.hash(user.password, 10)
  .then(hash => {
    user.password = hash
    next() // next() is calling the save()
  })
})

userSchema.methods.validPassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, callback)
}

const User = mongoose.model('User', userSchema)

module.exports = User
