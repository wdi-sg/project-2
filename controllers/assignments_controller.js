const express = require('express')
const Assignment = require('../models/assignment').model
const Classroom = require('../models/classroom').model
const User = require ('../models/user').model

module.exports = {
  loadAssignmentForm: function (req, res, next) {
                      User.findById({_id: req.user._id}, (function (err, user) {
                          if (err) { return console.log(err) }
                          Classroom.find({members: req.user.id}, function (err, classrooms){
                              res.render('createAssignment', {user: user, classrooms: classrooms})
                            })
                          })
                        )
                      },

  createAssignment: function (req, res, next) {
                      Assignment.create({
                        a_type: req.body.atype,
                        title: req.body.title,
                        description: req.body.description,
                        createdOn: Date.now(),
                        due_date: req.body.due_date,
                        est_time: req.body.est_time,
                        created_by: req.user._id,
                        classroom: req.body.classroom
                        }, function (err, assignment) {
                          if (err) { return console.log(err) }
                          Classroom.find({_id: assignment.classroom}, function (err, classroom) {
                            if (err) { return console.log(err) }
                            console.log('classroom', classroom)
                            classroom[0].assignments.push(assignment._id)
                            classroom[0].save(function (err) {
                              if (err) { return console.log(err) }
                            })
                            res.redirect('/profile/' + req.user._id + '/dashboard')
                          })
                        })
                      },
  viewOneAssignment: function (req, res, next) {
                      Assignment.find({_id: req.params._id}, function (err, assignment) {
                        if (err) { return console.log(err) }
                        res.render('updateAssignment', {assignment: assignment})
                      })
                    },
  editOneAssignment: function (req, res, next) {
                      Assignment.update({_id: req.params._id}, {
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
                      let query = req.body.id
                      if (typeof query === 'object' && query.length > 1) {
                        for(let i = 0; i < query.length; i++) {
                          Assignment.find({_id: query[i]}).remove().exec(function (err){
                            if (err) {return console.log(err)}
                          })
                          if (i === (query.length - 1)) {
                            Assignment.find({_id: query[i]}).remove().exec(function (err) {
                                if (err) {return console.log(err) }
                                res.redirect('/profile/'+ req.user.id + '/dashboard')
                              })
                            }
                          }
                        } else {
                        Assignment.remove({_id: req.body.id}, function (err){
                          if (err) { return console.log(err) }
                          res.redirect('/profile/'+ req.user.id + '/dashboard')
                        })
                      }
                    }
}


// function requireRole (role) {
//     return function(req, res, next) {
//       if (req.user && req.user.role === role) next();
//       else
//           res.send(404);
//     }
// }
