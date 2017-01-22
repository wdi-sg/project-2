const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(this.password, password)
}

UserSchema.options.toJSON = {
  transform: (doc, ret) => {
    delete ret.password
    return ret
  }
}

UserSchema.pre('save', function(next) {
  const hash = bcrypt.hashSync(this.password)
  this.password = hash
  next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User