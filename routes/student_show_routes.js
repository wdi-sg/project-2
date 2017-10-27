const Student = require('../models/student')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('students/show')
})

router.put('/:id', (req, res) => {
  var formData = req.body
  Student.findByIdAndUpdate(req.params.id, {
    name: formData.name,
    email: formData.email,
    description: formData.description,
    currentCourse: formData.currentCourse,
    completedCourse: formData.completedCourse,
    status: formData.status,
    currentTeach: formData.currentTeach,
    instructorRating: formData.instructorRating
  })
  .then(() => res.redirect(`/studentshow`))
  .catch(err => console.log(err))
})


module.exports = router
