const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const Course = require('../models/course')

const studentSchema = new Schema({
  name: String,
  email: String,
  password: String,
  slug: String,
  description: String,
  currentCourse: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  type: String
})

studentSchema.pre('save', function (next) {
  var student = this
  student.slug = student.name.toLowerCase().split(' ').join('-')

  bcrypt.hash(student.password, 10)
  .then(hash => {
    student.password = hash
    next()
  })
})

studentSchema.methods.validPassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, callback)
}
const Student = mongoose.model('Student', studentSchema)

module.exports = Student
