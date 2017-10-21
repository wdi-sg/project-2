const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  slug: String
})

userSchema.pre('save', function (next) {
  var user = this
  user.slug = user.name.toLowerCase().split(' ').join('-')
  bcrypt.hash(user.password, 10)
  .then(hash => {
    user.password = hash
    console.log('user password is hashed and it\'s saved in mongoose database')
    next()
  })
})

userSchema.methods.validPassword = function(plainPassword, callback) {
  bcrypt.compare(plainPassword)
}
const User = mongoose.model('User', userSchema)

module.exports = User
