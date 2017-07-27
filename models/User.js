const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')

var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please type your name']
  },
  email: {
    type: String,
    required: [true, 'Please type your email'],
    match: emailRegex
  },
  password: {
    type: String
  },
  events: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }]
})

userSchema.pre('save', function (next) {
  var user = this

   // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // hash the password
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err)

    // Override the cleartext password with the hashed one
    user.password = hash
    next()
  })
})

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
