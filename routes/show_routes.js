const Course = require('../models/course')
const User = require('../models/user')
const Review = require('../models/review')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('users/show')
})

router.put('/:id', (req, res) => {
  var formData = req.body
  User.findByIdAndUpdate(req.params.id, {
    name: formData.name,
    email: formData.email,
    description: formData.description,
    currentCourse: formData.course,
    status: formData.status,
    instructorRating: formData.instructorRating,
    currentTeach: formData.currentTeach
  })
  .then(() => res.redirect(`/show`))
  .catch(err => console.log(err))
})

module.exports = router
