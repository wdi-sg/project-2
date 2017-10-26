const passport = require('../config/ppConfig')
const Student = require('../models/student')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('students/register')
})

router.post('/', (req, res) => {
  var formData = req.body.student
  console.log('here1 :' , formData)
  var newStudent = new Student({
    name: formData.name,
    email: formData.email,
    password: formData.password
  })



  newStudent.save()
  .then(
    student => {
      console.log('saved :', student)
      passport.authenticate('local', {
        successRedirect: '/'
      })(req, res);
    },
    err => res.send(err)
  )
})

module.exports = router
