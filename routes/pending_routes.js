const express = require('express')
const Course = require('../models/course')
const router = express.Router()

router.get('/', (req, res) => {
  Course.find()
  .populate('teacher')
  .then(output => {
    res.render('courses/pending', {
      output
    })
  })
})

router.post('/', (req, res) => {
  var formData = req.body.course

  var newCourse = new Course({
    address: formData.address,
    name: formData.name,
    description: formData.description,
    duration: formData.duration,
    date: formData.date,
    time: formData.time,
    price: formData.price,
    currentStudents: formData.currentStudents,
    teacher: formData.user,
    slug: formData.name.toLowerCase().split(' ').join('-')
  })

  newCourse.save()
    .then(() => res.redirect('/pending'))
    .catch(err => console.log(err))
})

module.exports = router
