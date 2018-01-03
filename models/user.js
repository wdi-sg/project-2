const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please type in your name']
  },
  email: {
    type: String,
    required: [true, 'Please type in your email']
  },
  password: {
    type: String,
    required: true
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User