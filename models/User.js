const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
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

userSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    // delete the password from the JSON data, and return
    delete ret.password
    return ret
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User
