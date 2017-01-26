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
      })
  }
  else {

    res.render('dashboard')
  }

})

router.get('/accountinfo/:id', isLoggedIn, function (req, res) {
  User.findById(req.params.id, function (err, user) {
  if (err) { return console.log(err) }
  res.render('accountinfo', {user: user})
  })

})

router.post('/accountinfo/:id', function (req, res) {
  console.log("accountinfo post fired");
  School.findOne({name: req.body.school}, function (err, school) {
    if (err) { return console.log(err) }
    console.log("acctinfo found school " + school);
    req.body.school = school._id
  })
  User.update({_id: req.params.id}, {school: req.body.school, name: req.body.name}, function (err, user) {
    console.log("acct info updated " + user);
    if(err) {return console.log(err)}
    res.redirect('/dashboard')
  })
})

router.post('/signup', function (req, res, next) {
  User.create({
    role: req.body.role,
    email: req.body.email,
    password: req.body.password
  }, function (err, createdUser) {
    if(err){
        req.flash('error', 'Could not create user account');
        res.redirect('/index');
      } else {
        passport.authenticate('local', {
          successRedirect: '/auth/accountinfo/' + createdUser._id,
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


// router.get('/logout', function(req, res) {
//   req.logout();
//   req.flash('success', 'You have logged out');
//   res.render('index');
// })


// if (req.body.role === 'teacher') {
//   console.log('this is the school create function');
//   School.create ({
//     name: req.body.school,
//     teacher: req.body.email
//   }, function (err, createdSchool) {
//     if (err) {
//       req.flash('error', 'Could not create school');
//       res.redirect('/index')
//     } else {
//       passport.authenticate('local', {
//         successRedirect: '/edit_profile',
//         failureRedirect: '/index',
//         successFlash: 'Account created and logged in'
//       })(req, res, next)
//     }
//   })
// }

module.exports = router
