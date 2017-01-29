const express = require('express')
const Classroom = require('../models/classroom').model
const User = require('../models/user').model
const School = require('../models/school').model
const Assignment = require('../models/assignment').model

module.exports = {

  viewClass: function (req, res, next) {
    Classroom.findById({ _id: req.params.id })
             .populate('assignments')
             .exec(function (err, classroom) {
               if (err) { return console.log(err) }
               res.render('classBulletin', {classroom: classroom})
             })
    },

  createClass: function (req, res, next) {
    // Assignment.create({
    //   a_type: req.body.atype,
    //   title: req.body.title,
    //   description: req.body.description,
    //   createdOn: Date.now(),
    //   due_date: req.body.due_date,
    //   est_time: req.body.est_time,
    //   created_by: req.user._id
    // }, function (err, assigment) {
    //   if (err) { return console.log(err) }
    //
    // })

    Classroom.create({
      name: req.body.name,
      members: req.user._id
    }, function (err, createdClassroom) {
      if (err) { return console.log(err) }
      res.redirect('/classBulletin/')
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
        res.redirect('/dashboard/' + req.user._id)
      })
    })
  }

}
