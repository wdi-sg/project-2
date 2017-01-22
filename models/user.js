const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: [6, 'Name should be between 6 to 20 characters.'],
    maxlength: [20, 'Name should be between 6 to 20 characters.']
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  },
  password: {
    type: String,
    require: true,
    minlength: [6, 'Password should be between 6 to 10 characters.'],
    maxlength: [10, 'Password should be between 6 to 10 characters.']
  },
  memberSince: {
    type: Date,
    default: Date.now()
  }
})

userSchema.pre('save', function (next) {
  let user = this

  if (!user.isModified('password')) return next()

  let hashedPassword = bcrypt.hashSync(user.password, 10)

  user.password = hashedPassword
  next()
})

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

let User = mongoose.model('User', userSchema)

module.exports = User
