const Course= require('../models/course')
const User= require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('courses/courseupdate')
})

// router.put('/:slug', (req, res) => {
//     var formData = req.body
//     User.findBySlugAndUpdate(req.params.slug, {
//       address: formData.address,
//       name: formData.name,
//       description: formData.description,
//       duration: formData.duration,
//       date: formData.date,
//       time: formData.time,
//       price: formData.price,
//       currentStudents: formData.currentStudents,
//       teacher: formData.user,
//       slug: formData.name.toLowerCase().split(' ').join('-')
//     })
//     .then(() => res.redirect('/pending'))
//     .catch(err => console.log(err))
//   })




module.exports = router
