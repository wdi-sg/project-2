const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    match: regex
  },
  password: {
    type: String,
    required: true,
    minlength: [7, 'Password must be minimum 7 characters']
  }
})

userSchema.pre('save', function (next) {
  var user = this
   // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err)

    user.password = hash
    next() // call the save fn
  })
})

userSchema.methods.validPassword = function (givenPassword) {
  // t/f based on the user.hashed compared with form.password

  return bcrypt.compareSync(givenPassword, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
