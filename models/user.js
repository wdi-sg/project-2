const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt') // for login and register

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  slug: String // new field for vanity url
})

// and save the hash instead
userSchema.pre('save', function(next) {
  var user = this
  // logic to create slug
  user.slug = user.name.toLowerCase().split(' ').join('-')

  bcrypt.hash(user.password, 10)
  .then(hash => { // the then method here is when we got the hash
    // call the next() when the password is hashed
    user.password = hash
    console.log('pre save flow', user)
    next() // next() is calling the save()
  })
})

userSchema.methods.validPassword = function (plainPassword, callback) {
  return bcrypt.compare(plainPassword, this.password, callback)
}

const User = mongoose.model('User', userSchema)

// need to export this
module.exports = User
