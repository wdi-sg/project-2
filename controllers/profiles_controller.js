const express = require('express')
const passport = require('../config/ppConfig')
const isLoggedin = require('../middleware/isLoggedin')

module.exports = {
  getProfile: function (req, res, next) {
                User.findById(req.user._id, function (err, user) {
                  if (err) { return console.log(err) }
                  School.find({}, function (err, schools) {
                    if (err) { return console.log(err)}
                    res.render('/profile/' + req.user._id, {user: user, schools: schools})
                  })
                })
              },

  editProfile: function (req, res, next) {
                User.update({_id: req.user._id}, {
                  school: req.body.school,
                  name: req.body.name},
                  function (err, user) {
                    if(err) {return console.log(err)}
                    res.redirect('/dashboard' + req.user_id)
                  })
                },
  loadDashboard: function (req, res, next) {
                  User.find({_id: req.user.id})
                      .populate('school')
                      .populate('classrooms')
                      .exec(function (err, user) {
                        if (err) { return console.log(err) }
                        res.render('dashboard', {user: user})
                      })
                    }

}
