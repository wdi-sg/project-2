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
    Review.find({author:course.id})
    .then(results=>{
      console.log(results);
      res.render('courses/course', {
        course,
        review: results
      })
    })

  })
  .catch(err => {
    console.log(err)
  })
})


router.post('/', (req, res) => {
  // res.send(req.body);
  var formData = req.body
  var newReview = new Review({
    title: formData.title,
    description: formData.description,
    author: formData.courseId
  })
  newReview.save()
  .then(
    () => res.redirect('/pending'),
    err => res.send('error happened')
  )
})



module.exports = router
