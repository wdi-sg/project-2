const User = require('../models/user')
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
    currentCourse: formData.currentCourse,
    completedCourse: formData.completedCourse,
    status: formData.status,
    currentTeach: formData.currentTeach,
    instructorRating: formData.instructorRating
  })
  .then(() => res.redirect(`/show`))
  .catch(err => console.log(err))
})


module.exports = router
