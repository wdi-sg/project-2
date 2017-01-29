const express = require('express')
const Assignment = require('../models/assignment').model
const Classroom = require('../models/classroom').model
const School = require('../models/school').model
const schoolSchema = require('../models/school').schema

module.exports = {
  loadAssignmentForm: function (req, res, next) {
                      User.findById({_id: req.user._id})
                          .populate('classrooms')
                          .exec (function (err, user) {
                            if (err) { return console.log(err) }
                            res.render('createAssignment', {user: user})
                          })
                      },

  createAssignment: function (req, res, next) {
                    Assignment.create({
                      a_type: req.body.atype,
                      title: req.body.title,
                      description: req.body.description,
                      createdOn: Date.now(),
                      due_date: req.body.due_date,
                      est_time: req.body.est_time,
                      created_by: req.user._id
                    }, function (err, assigment) {
                      if (err) { return console.log(err) }
                      res.redirect('/dashboard')
                    })

                  },
  viewOneAssignment: function (req, res, next) {
                      Assignment.findOne({_id: req.params._id}, function (err, assignment) {
                        if (err) { return console.log(err) }
                        res.render('updateAssignment', {assignment: assignment})
                      })
                    },
  editOneAssignment: function (req, res, next) {
                      Assignment.update({_id: assignment._id}, {
                        a_type: req.body.atype,
                        title: req.body.title,
                        description: req.body.description,
                        due_date: req.body.due_date,
                        est_time: req.body.est_time
                      }, function (err, assignment) {
                        if (err) { console.log(err) }
                        res.redirect('/dashboard')
                      })
                    },

  deleteAssignment: function (req, res, next) {
                      Assignment.remove({_id: req.params.id}, function (err) {
                        if (err) { return console.log(err) }
                        res.redirect('/dashboard')
                      })
                    }
}

// function requireRole (role) {
//     return function(req, res, next) {
//       if (req.user && req.user.role === role) next();
//       else
//           res.send(404);
//     }
// }
