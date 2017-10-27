const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('../models/user')

const courseSchema = new Schema({
  address: String,
  name: String,
  description: String,
  currentStudents: Number,
  duration: String,
  date: String,
  time: String,
  price: String,
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  slug: String
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course
