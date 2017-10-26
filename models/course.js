const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('../models/user')

const courseSchema = new Schema({
  address: String,
  name: String,
  description: String,
  currentStudents: [{
    name: String
  }],
  duration: String,
  date: String,
  time: String,
  price: String,
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  status: String,
  slug: String
})

// courseSchema.pre('save', function(next) {
//   var course = this
//   course.slug = course.name.toLowerCase().split(' ').join('-')
// })

const Course = mongoose.model('Course', courseSchema)



module.exports = Course
