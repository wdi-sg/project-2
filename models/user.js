const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  slug: String,
  listings:[{
    type: Schema.Types.ObjectId,
    ref: 'Listings'
  }]
})

userSchema.pre('save', function (next) {
  var user = this

  user.slug = user.username.toLowerCase().split(' ').join('-')

  bcrypt.hash(user.password, 10)
  .then(hash => {
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
