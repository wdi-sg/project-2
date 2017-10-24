//require mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema // constructor for all Schema
// const emailRegex = require('email-regex');

//require bcyrpt
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true ,
    minlength: [8, 'Password must be between 8 and 99 characters'],
    maxlength: [99, 'Password must be between 8 and 99 characters'],
  },
  phoneNumber:{
    type: Number
  }
})

userSchema.pre('save', function(next){
  var user = this
  bcrypt.hash(user.password, 10)
  .then(hash => {
  // call the next() when the password is hashed
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
