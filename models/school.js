const mongoose = require("mongoose")
const User = require("../models/user").schema
const Classroom = require("../models/classroom").schema

const schoolSchema = new mongoose.Schema({
  name: {type: String},
  teacher: { type: String},
  classrooms: [{type: mongoose.Schema.Types.ObjectId, ref: 'Classroom'}],
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

const School = mongoose.model('School', schoolSchema)

module.exports = {
  model: School,
  schema: schoolSchema
}
