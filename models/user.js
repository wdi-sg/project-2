const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  userMed: [{
    type: Schema.Types.ObjectId,
    ref: 'Medication'
  }]
})

userSchema.pre('save', function (next) {
  var user = this

  if (!user.isModified('password')) return next()

  bcrypt.hash(user.password, 10)
  .then(hash => {
    user.password = hash
    next() // next() is calling the save()
  })
})

userSchema.methods.validPassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, callback)
}

const User = mongoose.model('User', userSchema)

module.exports = User
