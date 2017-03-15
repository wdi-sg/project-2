const express = require('express')
const passport = require('../config/ppConfig')
const User = require('../models/user').model

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
                        console.log("the created user is " + createdUser);
                        if(err) {
                          req.flash('error', 'Could not create user account')
                          res.redirect('/')
                        } else {
                            passport.authenticate('local', {
                              successRedirect: '/profile/' + createdUser._id + '/edit',
                              failureRedirect: '/',
                              successFlash: 'Account created and logged in'
                            })(req, res, next)
                          }
                        })
                      },

    login: function (req, res, next) {
      passport.authenticate('local', {failureFlash: true}, function (err, user, info) {
        if (err) { return next(err) }
        if(!user) { return res.redirect('/') }
        req.logIn(user, function (err) {
          if (err) { return next(err) }
          return res.redirect('/profile/' + user._id)
        })
      })(req, res, next)
    },

 // login: passport.authenticate('local', {
 //          successRedirect: '/dashboard',
 //          failureRedirect: '/auth/login',
 //          failureFlash: true,
 //          successFlash: 'You have logged in'
 //        }),


 logout: function (req, res, next) {
          req.logout()
          req.flash('success', 'You have logged out')
          res.render('index')
        }

}
