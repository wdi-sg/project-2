const Course = require('../models/course')
const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/:id', (req, res) => {
  Course.findById(req.params.id)
  .populate('teacher')
  .then(course => {
    res.render(`courses/courseupdate`, {
      course
    })
  })
})

router.put('/:id', (req, res) => {
  var formData = req.body
  Course.findByIdAndUpdate(req.params.id, {
    name: formData.name,
    description: formData.description,
    duration: formData.duration,
    date: formData.date,
    time: formData.time,
    price: formData.price
  })
  .then(() => res.redirect(`/pending`))
  .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  Course.findByIdAndRemove(req.params.id)
  .then(() => res.redirect('/pending'))
  .catch(err => console.log(err))
})

module.exports = router
