const Course= require('../models/course')
const User= require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/:slug', (req, res) => {
  Course
  .findOne({slug: req.params.slug})
  .populate('teacher')
  .then(course => {
    // res.send(course)
    console.log('teacher name: ', course.teacher.name)
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
    description: formData.description,
    author: formData.user.name
  })
  newReview.save()
  .then(
    () => res.redirect('/course'),
    err => res.send('error happened')
  )
})


// router.put('/', (req, res) => {
//   var formData = req.body
//   Course.findByIdAndUpdate(req.params.id, {
//     address: formData.address,
//     name: formData.name,
//     description: formData.description,
//     duration: formData.duration,
//     date: formData.date,
//     time: formData.time,
//     price: formData.price,
//   })
//   .then(() => res.redirect(`/classes`))
//   .catch(err => console.log(err))
// })


module.exports = router
