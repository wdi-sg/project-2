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
    res.render('courses/course', {
      course
    })
  })
  .catch(err => {
    console.log(err)
  })
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
//   .then(() => res.redirect(`/course/${req.params.id}`))
//   .catch(err => console.log(err))
// })


module.exports = router
