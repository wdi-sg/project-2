const mongoose = require('mongoose')
var bcrypt = require('bcrypt')
const Schema = mongoose.Schema

var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

const userSchema = new Schema({
  name: {
    type: String
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
    required: true
  },
  slug: String,
  readBooks: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }]
})

userSchema.pre('save', function (next) {
  var user = this
  console.log(user)
  if (!user.isModified('password')) return next()
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
