const express = require('express')
const router = express.Router();
const Classroom = require('../models/classroom').model
const User = require('../models/user').model
const School = require('../models/school').model


function getschoolId (req, res, next) {
  School.findOne({name: req.user.school }, function (err, school){
  if (err) { return console.log(err) }
  console.log('found school' + school);
  req.body.school  = school._id
  next()
})

}

// router.get('/:id', function (req, res) {
//   Classroom.findById(req.params.id, function (err, classroom) {
//     if (err) { return console.log(err) }
//     res.json(classroom)
//   })
// })

router.get('/classBulletin/:id', function(req, res) {
  Classroom.findById(req.params.id, function (err, classroom) {
    if (err) { return console.log(err) }
    res.render('classBulletin', {classroom: classroom})
  })
})


router.get('/addclass', function(req, res) {
  console.log('this is running?');
  console.log(req.user);
  res.render('addclass', {currentUser: req.user})
})

router.post('/addclass', getschoolId, function (req, res) {

  Classroom.create({
    name: req.body.name,
    members: req.user._id,
    school: req.body.school
  }, function (err, classroom) {
    if (err) {  return console.log(err)  }
    console.log(classroom._id);

    User.findById(req.user._id, function (err, user) {
        if (err) { return console.log("userFind" + err);}
        console.log("this is the user found" + user);
        user.classrooms.push(classroom._id)
        user.save()
      } )

    School.findOne({_id: req.body.school}, function(err, school) {
        if (err) { return console.log("schoolFind" + err);}
        console.log("this is the school found" + school);
        school.classrooms.push(classroom._id)
        school.save()
        })
    res.redirect('/classroom/classBulletin/' + classroom._id)
  })
})

module.exports = router
