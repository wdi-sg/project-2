const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const Course = require('../models/course')

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  slug: String,
  description: String,
  currentCourse: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
  },
  status: String,
  currentTeach: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
  },
  instructorRating: String,
})

userSchema.pre('save', function(next) {
  var user = this
  user.slug = user.name.toLowerCase().split(' ').join('-')

  bcrypt.hash(user.password, 10)
  .then(hash => {
  user.password = hash
  next()
  })
})

userSchema.methods.validPassword = function(plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, callback)
}
const User = mongoose.model('User', userSchema)

module.exports = User
