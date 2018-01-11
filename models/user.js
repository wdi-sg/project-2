const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')
const tourId = { type: Schema.Types.ObjectId, ref: 'Tour' }

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  slug: String,
  admin: Boolean,
  cart:
  [{
    tourDate: String,
    bookedTour: tourId
  }]
})

userSchema.pre('save', function(next) {
  var user = this
  user.slug = user.name.toLowerCase().split(' ').join('-')

  // to avoid rehashing the password everytime user.save() is called
  if (!user.isModified('password')) return next()

  bcrypt.hash(user.password, 10)
  .then(hash => {
    user.password = hash
    next()
  })
})

userSchema.methods.validPassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, callback)
}

const User = mongoose.model('User', userSchema)

module.exports = User
