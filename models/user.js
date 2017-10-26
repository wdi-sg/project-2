const mongoose = require('mongoose')
var bcrypt = require('bcrypt')
const Schema = mongoose.Schema

var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

const userSchema = new Schema({
  name: {
    type: String,
    minlength: [3, 'Name must be between 3 and 20 characters'],
    maxlength: [20, 'Name must be between 3 and 20 characters']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: emailRegex
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be between 6 and 20 characters'],
    maxlength: [20, 'Password must be between 6 and 20 characters']
  },
  slug: String
})

userSchema.pre('save', function (next) {
  var user = this
  // create slug
  user.slug = user.name.toLowerCase().split(' ').join('-')
  // hash the password
  bcrypt.hash(user.password, 10)
  .then(hash => {
    user.password = hash
    console.log('pre save flow', user)
    next() // next() is calling the save()
  })
})

userSchema.methods.validPassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, callback)
}

const User = mongoose.model('User', userSchema)

module.exports = User
