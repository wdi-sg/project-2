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
    Classroom.find({school: req.user.school}, function (err, classrooms) {
      if (err) { return console.log(err) }
      res.render('addclass', {classrooms: classrooms})
      })
    },
  joinClass: function (req, res, next) {
    Classroom.findById({_id: req.body._id}, function (err, classroom) {
      if (err) { return console.log(err) }
      classroom.members.push(req.user._id)
      classroom.save()
      res.redirect('/profile/' + req.user._id + '/dashboard')
    })
  },
  createClass: function (req, res, next) {
    Classroom.create({name: req.body.name, school: req.body.school}, function (err, classroom) {
      if (err) { return console.log(err) }
      classroom.members.push(req.user.id)
      classroom.save()
      res.redirect('/profile/' + req.user._id + '/dashboard')
    })
  },
  leaveClass: function(req, res, next) {
    Classroom.findById({_id: req.params._id}, function(err, classroom) {
      if (err) { return console.log(err) }
      let memberIndex = classroom[0].members.indexOf(req.user._id)
      classroom[0].members.splice((memberIndex - 1), 1)
      User.findById({_id: req.user._id}, function (err, user) {
        if (err) { return console.log(err) }
        let classroomIndex = user.classrooms.indexOf(req.params._id)
        user.classrooms.splice((classroom - 1), 1)
        res.redirect('/profile/' + req.user._id + '/dashboard' )
      })
    })
  }

}
