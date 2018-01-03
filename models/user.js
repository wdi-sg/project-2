const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const requiredString = { type: String, required: true }
const tweetId = { type: Schema.Types.ObjectId, ref: 'Tweet' }

const userSchema = new Schema({
  username: { type: String, lowercase: true, match: /^[a-z0-9]+$/, unique: true },
  name: requiredString,
  email: requiredString,
  password: requiredString,
  tweets: [tweetId],
  mentions: [tweetId],
  followers: [ this ],
  following: [ this ]
})

userSchema.pre('save', function(next) {
  var user = this
  // if password is not modified, return next()
  if (!user.isModified('password')) return next()
  // else, hash the password
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
