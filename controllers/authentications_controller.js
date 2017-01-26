const express = require('express')
const passport = require('../config/ppConfig')
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn')
const User = require('../models/user').model
const School = require('../models/school').model
const Assignment = require('../models/assignment').model
const Classroom = require('../models/classroom').model


router.get('/dashboard', isLoggedIn, function (req, res) {
  if (req.user.role === 'teacher') {
    console.log("I am a teacher.");
    let classroomsArray = req.user.classrooms
    console.log('classroom array is ' + classroomsArray);

    User.find({_id: req.user._id})
        .populate('classrooms')
        .exec (function (err, user) {
          console.log("user obj is " + user);
          if (err) { return console.log(err);}
          Assignment.find({ created_by: req.user._id }, function(err, assignments) {
          if(err) { return console.log(err)}
          console.log('assignments is ' + assignments);

          res.render('dashboard', {assignments: assignments, user: user})
    })



      // var counter = 0
      // var result = []
      //
      // for (var i = 0; i < classroomsArray.length; i++) {
      //   Classroom.find({_id: classroomsArray[i]})
      //   .populate('assignments')
      //   .exec(function (err, classrooms) {
      //     if (err) {return console.log(err)}
      //     console.log(classrooms);
      //     result.push(classrooms)
      //     callback()
      //   })
      // }
      // function callback () {
      //   counter++
      //   if (counter === classroomsArray.length - 1){
      //     res.render('dashboard', {assignments: assignments, classrooms: result})
      //   }
      // }
    })
  }
  else {
    res.render('dashboard')
  }

})


router.post('/signup', function (req, res, next) {
  User.create({
    role: req.body.role,
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    school: req.body.school
  }, function (err, createdUser) {
    if (req.body.role === 'teacher') {
      console.log('this is the school create function');
      School.create ({
        name: req.body.school,
        teacher: req.body.email
      }, function (err, createdSchool) {
        if (err) {
          req.flash('error', 'Could not create school');
          res.redirect('/index')
        } else {
          passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/index',
            successFlash: 'Account created and logged in'
          })(req, res, next)
        }
      })
    }
    if(err){
        req.flash('error', 'Could not create user account');
        res.redirect('/index');
      } else {
        passport.authenticate('local', {
          successRedirect: '/dashboard',
          failureRedirect: '/index',
          successFlash: 'Account created and logged in'
        })(req, res, next)
      }
    })
  })


router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/index',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}))

// router.get('/signup', function(req, res) {
//   res.render('index');
// });
//
// router.get('/login', function(req, res) {
//   res.render('login');
// });

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You have logged out');
  res.render('index');
});


module.exports = router
