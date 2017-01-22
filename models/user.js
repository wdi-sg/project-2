const mongoose = require('mongoose')

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: emailRegex
  },
  name: {
    type: String
  },
  password: {
    type: String,
    minlength: [5, 'Password must be at least 5 characters long.']
  }
})

const User = mongoose.model('User', UserSchema)
module.exports = User