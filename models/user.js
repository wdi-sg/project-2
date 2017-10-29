const mongoose = require('mongoose')
const Schema = mongoose.Schema // constructor for all schema
const bcrypt = require('bcrypt') // for login and register

// setting the blueprint of User object
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  // image: String,
  slug: String
})

userSchema.pre('save', function(next) {
  var user = this
  user.slug = user.name.toLowerCase().split(' ').join('-')

  bcrypt.hash(user.password, 10)
  .then(hash => {
    user.password = hash
    console.log('pre save flow', user)
    next() // next() is calling the save()
  })
})

userSchema.methods.validPassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, callback)
}

const User = mongoose.model('User', userSchema)


module.exports = User
