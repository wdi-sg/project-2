const mongoose = require('mongoose')
const Classroom = require("../models/classroom")
const User = require("../models/user")

const assignmentSchema = new mongoose.Schema({
  a_type: {type: String},
  title: {type: String},
  description: {type: String},
  createdOn: {type: Date},
  due_date: {type: Date},
  est_time: {type: Number},
  classroom: {type: mongoose.Schema.Types.ObjectId, ref:'Classroom'},
  created_by: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
})

const Assignment = mongoose.model('Assignment', assignmentSchema)

module.exports = {
  model: Assignment,
  schema: assignmentSchema
}
