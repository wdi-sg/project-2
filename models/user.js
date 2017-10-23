const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  slug: String // new field for vanity url
})

userSchema.pre('save', function(next) {
  var user = this
  // logic to create slug
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
