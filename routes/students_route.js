const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students_controller')
const passport =
require('../config/passport')
const Teacher = require('../models/teacher')

router.get('/new', function (req, res) {
  res.render('students/index');
});

router.get('/studentLoginView', studentsController.showAllTeachers);


router.get('/studentRequestView', studentsController.showRequests)

router.post('/', studentsController.create);

router.post('/refer', studentsController.refer);

router.post('/deleteRequest', studentsController.deleteRequest);


router.post('/login',
 passport.authenticate('local-student', {
   successRedirect: '/students/studentLoginView',
   failureRedirect: '/students/new'
 }))

 router.post('/searchTeacher', studentsController.searchTeacher)

module.exports = router;
