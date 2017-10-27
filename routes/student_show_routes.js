const Student = require('../models/student')
const Course = require('../models/course')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  Student.findOne({_id: req.user.id})
  .then(student => {
    console.log(student)
    res.render('students/show', {
      student
    })
  })
})

router.put('/:id', (req, res) => {
  var formData = req.body
  Student.findByIdAndUpdate(req.params.id, {
    name: formData.name,
    email: formData.email,
    description: formData.description,
    currentCourse: formData.course,
    completedCourse: formData.completedCourse

  })
  .then(() => res.redirect(`/studentshow`))
  .catch(err => console.log(err))
})

module.exports = router
