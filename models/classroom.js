const mongoose = require('mongoose')
const schoolSchema = require("../models/school").schema
const School = require("../models/school").model
const userSchema = require("../models/user").schema
const User = require("../models/user").model
const Assignment = require("../models/assignment").schema


const classroomSchema = new mongoose.Schema({
  name: {type: String},
  school: {type: mongoose.Schema.Types.ObjectId, ref: 'School'},
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  assignments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Assignment'}]
})


const Classroom = mongoose.model('Classroom', classroomSchema)

// classroomSchema.pre('save', function(next){
//   var classroom = this;
//
//   School.findOne({ name: req.user.school }, function (err, schoolDoc){
//     if (err) { return console.log(err) }
//     console.log('found school' + schoolDoc);
//     classroom.school = schoolDoc._id
//     next()
//   })
//
// })

// classroomSchema.post('save', function (next, done) {
//   var classroom = this;
//   User.findById(req.user._id, function (err, user) {
//     user.classrooms = classroom._id
//     user.save()
//     next()
//   } )
//   School.findOne({school: classroom.school}, function(err, school) {
//     school.classrooms = classroom._id
//     school.save()
//     done()
//   })
//
// })

module.exports = {
  model: Classroom,
  schema: classroomSchema
}
