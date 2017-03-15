const express = require('express')
const Classroom = require('../models/classroom').model
const User = require('../models/user').model
const School = require('../models/school').model

module.exports = {

  viewClass: function (req, res, next) {
    Classroom.findById({ _id: req.params.id })
             .populate('assignments')
             .exec(function (err, classroom) {
               if (err) { return console.log(err) }
               res.render('classBulletin', {classroom: classroom})
             })
    },

  listClassrooms: function (req, res, next) {
    School.find({members: req.user._id}, function (err, result) {
      if (err) { return console.log(err) }
      Classroom.find({school: result._id}, function (err, classrooms){
        if (err) { return console.log(err)}
        res.render('addclass', {result: result, classrooms: classrooms})
        })
      })
    },
  createClass: function (req, res, next) {
    Classroom.
    find({name: req.body.name}).
    where('school').equals(req.body.school).
    exec(function (err, classroom) {
      if (classroom.length > 0) {
        classroom[0].members.push(req.user._id)
        classroom[0].save()
        res.redirect('/profile/'+ req.user._id + '/dashboard')
      } else {
        Classroom.create({
          name: req.body.name,
          members: req.user._id,
          school: req.body.school
          }, function (err, createdClassroom) {
            if (err) { return console.log(err) }
            res.redirect('/profile/'+ req.user._id + '/dashboard')
          })
      }
    })
  },

  leaveClass: function(req, res, next) {
    Classroom.findById({_id: req.params._id}, function(err, classroom) {
      if (err) { return console.log(err) }
      let memberIndex = classroom.members.indexOf(req.user._id)
      classroom.members.splice((memberIndex - 1), 1)
      User.findById({_id: req.user.id}, function (err, user) {
        if (err) { return console.log(err) }
        let classroomIndex = user.classrooms.indexOf(req.params._id)
        user.classrooms.splice((classroom - 1), 1)
        res.redirect('/profile/' + req.user._id + '/dashboard/' )
      })
    })
  }

}
