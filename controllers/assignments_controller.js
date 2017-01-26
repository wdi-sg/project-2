const express = require('express')
const router = express.Router();
const Assignment = require('../models/assignment').model
const Classroom = require('../models/classroom').model


function requireRole (role) {
    return function(req, res, next) {
      if (req.user && req.user.role === role) next();
      else
          res.send(404);
    }
}

function getClassroomId (req, res, next) {
  Classroom.findOne({name: req.body.classroom}, function (err, classroom){
    if (err) { return console.log(err)}
    console.log();
    req.body.classroom = classroom._id
    next()
  })
}

router.get('/create', function(req, res) {
  res.render('create')
})


router.post('/create', requireRole('teacher'), getClassroomId, function(req, res) {
  console.log(req.body);
  Assignment.create({
    a_type: req.body.a_type,
    classroom: req.body.classroom,
    title: req.body.title,
    description: req.body.description,
    due_date: req.body.date,
    est_time: req.body.time,
    createdOn: Date.now(),
    created_by: req.user._id,
  }
, function (err, assignment) {
    if (err) {  return console.log(err)  }
    res.redirect('/classroom/classBulletin/' + req.body.classroom)
  })
})

module.exports = router
