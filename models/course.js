const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({

  address: {
    building: String,
    coord: Array,
    street: String,
    zipcode: String
  },
  grades: [{
    date: Date,
    grade: String,
    score: Number
  }],
  name: String,
  course_id: String,

  owner: {
    type: Schema.Types.ObjectId
  }
})

const Course = mongoose.model('Course', courseSchema)




module.exports = Course
