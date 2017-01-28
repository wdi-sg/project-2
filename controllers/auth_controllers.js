const express = require('express')
const passport = require('../config/ppConfig')
const User = require('../models/user').model
const School = require('../models/school').model

module.exports = {
  loadSignUpForm: function (req, res, next) {
                  res.render('index')
                  },

  sendSignUpForm: function (req, res, next) {
                    User.create({
                      role: req.body.role,
                      email: req.body.email,
                      password: req.body.password
                    }, function (err, createdUser) {
                        if(err) {
                          req.flash('error', 'Could not create user account')
                          res.redirect('/')
                        } else {
                            passport.authenticate('local', {
                              successRedirect: '/profile/' + createdUser._id,
                              failureRedirect: '/',
                              successFlash: 'Account created and logged in'
                            })(req, res, next)
                          }
                        })
                      },

  login: function (req, res, next) {
          passport.authenticate('local', {
            successRedirect: '/dashboard/' + req.user._id,
            failureRedirect: '/',
            failureFlash: 'Invalid username and/or password',
            successFlash: 'You have logged in'
          })
        },

logout: function (req, res, next) {
          req.logout();
          req.flash('success', 'You have logged out');
          res.render('index');
        }

}
