const express = require('express')
const passport = require('../config/ppConfig')
const isLoggedin = require('../middleware/isLoggedin')
const User = require('../models/user').model
const School = require('../models/school').model
const Assignment = require('../models/assignment').model
const Classroom = require('../models/classroom').model

module.exports = {
  viewProfile: function (req, res, next) {
                User.findById(req.user._id)
                    .populate('school')
                    .exec(function (err, user) {
                      console.log('viewProfile return user is ' + user);
                      if (err) { return console.log(err) }
                      res.render('profile', {user: user})
                    })
              },

  getProfile: function (req, res, next) {
                User.findById(req.user._id)
                    .populate('school')
                    .exec(function (err, user) {
                      if (err) { return console.log(err) }
                      School.find({}, function (err, schools) {
                        if (err) { return console.log(err) }
                        res.render('editProfile', {user: user, schools: schools})  
                      })
                })
              },

  editProfile: function (req, res, next) {
                console.log(req.body);
                School.findOne({name: req.body.school}, function (err, school) {
                  if (err) { return console.log(err) }
                  if(school === null) {
                    School.create({name: req.body.school, members: req.user._id}, function (err, createdSchool) {
                      if (err) { return console.log(err) }
                      console.log("edit profile created school is " + createdSchool);
                      console.log('req role',req.body.role);
                      User.update({_id: req.user._id}, {
                        school: createdSchool._id,
                        name: req.body.name,
                        role: req.body.role }, function (err, user) {
                          if(err) { return console.log(err) }
                          res.redirect('/profile/'+ req.user._id + '/dashboard')
                        })
                      })
                    } else {
                      console.log("edit profile find school is " + school);
                      req.body.school = school._id
                      school.members.push(req.user._id)
                      school.save(function (err) {
                      if (err) {return console.log(err)}
                      console.log('school members saved')
                      })
                      User.update({_id: req.user._id}, {
                        school: req.body.school,
                        name: req.body.name,
                        role: req.body.role}, function (err, user) {
                          if(err) { return console.log(err) }
                          res.redirect('/profile/'+ req.user._id + '/dashboard')
                        })
                    }
              })
            },

  loadDashboard: function (req, res, next) {
                  console.log('load dashboard req.param ' + req.user.id);
                  User.find({_id: req.user.id})
                      .populate('school')
                      .exec(function (err, user) {
                        if (err) { return console.log(err) }
                        Assignment.find({created_by: req.user.id}).
                        populate('classroom').
                        exec(function (err, assignments) {
                          if (err) { return console.log(err) }
                          Classroom.find({members: req.user.id})
                          .populate('assignments')
                          .exec(function (err, classrooms) {
                            console.log(classrooms);
                            if (err) { return console.log(err) }
                            res.render('dashboard', {user: user, assignments: assignments, classrooms: classrooms})
                            })
                        })
                      })
                    },

  // getDashboard: function (req, res, next) {
  //                 console.log('get dashboard user id  ' + req.user._id);
  //                     User.find({_id: req.user._id})
  //                     .populate('school')
  //                     .populate('classrooms')
  //                     .exec(function (err, user) {
  //                       console.log(user);
  //                       if (err) { return console.log(err) }
  //                       Assignment.find({created_by: req.user._id}, function (err, assignments) {
  //                         if (err) { return console.log(err) }
  //                         res.render('dashboard', {user: user, assignments: assignments})
  //                       })
  //
  //                     })
  //                   },

  addSchool: function (req, res, next) {
              School.create({name: req.body.school}, function (err, createdSchool) {
                if (err) { return console.log(err) }
                res.redirect('/edit/:id')
              })
  }
}
