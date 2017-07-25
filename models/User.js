const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const findOrCreate = require('mongoose-findorcreate')

const userSchema = new Schema({
  igId: String,
  username: String,
  access_token: String
})

userSchema.plugin(findOrCreate)

userSchema.pre('save', function (next) {
  var user = this

  if (!user.isModified('password')) return next()

  bcrypt.hash(user.password, 10, function (err, hash) {
    if(err) return next (err)

    user.password = hash

    next()
  })
})

userSchema.methods.validPassword = function (givenPassword) {
  return bcrypt.compareSync(givenPassword, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
