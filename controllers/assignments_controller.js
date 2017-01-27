const express = require('express')
const router = express.Router();
const Assignment = require('../models/assignment').model
const Classroom = require('../models/classroom').model
const School = require('../models/school').model
const schoolSchema = require('../models/school').schema


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

router.get('/update/:id', function(req,res) {
  console.log("this is update" + req.params.id);
  Assignment.findOne({_id: req.params.id}, function (err, assignment) {
    if (err) { return console.log(err)}
    res.render('update', {assignment: assignment})
  })
})


router.put('/update/:id', function(req, res) {
  Assignment.update({_id: req.params.id}, function (err, assignment){
    if (err) console.log(err);
    res.redirect('dashboard')
  })
})

router.delete('/remove/:id', function(req, res) {
  Assignment.remove({_id: req.body.id }, function (err) {
    if (err) { return console.log(err)}
    console.log('assignment deleted')
    res.redirect("/dashboard")
  })
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
