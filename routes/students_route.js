const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students_controller')
const passport =
require('../config/passport')
const Teacher = require('../models/teacher')

  router.get('/new', notAuthenticated, function (req, res) {
  res.render('students/index');
});

  router.get('/studentLoginView', isAuthenticated, studentsController.showAllTeachers);


  router.get('/studentRequestView', isAuthenticated, studentsController.showRequests)

router.post('/', studentsController.create);

router.post('/refer', studentsController.refer);

router.post('/deleteRequest', studentsController.deleteRequest);


router.post('/login',
 passport.authenticate('local-student', {
   successRedirect: '/students/studentLoginView',
   failureRedirect: '/students/new'
 }))

 router.post('/searchTeacher', studentsController.searchTeacher)

 function isAuthenticated (req, res,next) {
   if (!req.user) {
     res.redirect('/')
   } else if(req.user.category === "student") {
     if(req.isAuthenticated()) {
       next()
     }
   } else if (req.user.category === "teacher") {
     res.redirect('/teachers/teacherLoginView')
   }
 }

 // function isAuthenticated (req,res,next) {
 //   if(req.isAuthenticated()) {
 //     next()
 //   } else {
 //     res.redirect('/')
 //   }
 // }

 function notAuthenticated (req, res,next) {
   if(!req.isAuthenticated()) {
     next()
   } else {
     res.redirect('/students/studentLoginView')
   }
 }

module.exports = router;
