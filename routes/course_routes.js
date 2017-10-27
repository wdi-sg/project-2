const Course = require('../models/course')
const User = require('../models/user')
const Review = require('../models/review')
const express = require('express')
const router = express.Router()

router.get('/:slug', (req, res) => {
  Course
  .findOne({slug: req.params.slug})
  .populate('teacher')
  .then(course => {
    res.render('courses/course', {
      course
    })
  })
  .catch(err => {
    console.log(err)
  })
})

router.post('/', (req, res) => {
  var formData = req.body
  var newReview = new Review({
    title: formData.title,
    description: formData.description
  })
  newReview.save()
  .then(
    () => res.redirect('/pending'),
    err => res.send('error happened')
  )
})



module.exports = router
