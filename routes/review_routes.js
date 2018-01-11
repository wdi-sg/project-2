const express = require('express')
const router = express.Router()

const Review = require('../models/review')

// router.get('/', (req, res) => {
//   Review.find()
//   .populate('author')
//   .then(data => res.send(data))
// })

router.post('/add', (req, res) => {
  var formData = req.body

  var newReview = new Review({
    title: formData.title,
    description: formData.description,
    author: formData.userId,
    tourSlug: formData.slug
  }) // creating new `Review` object

  newReview.save() // save the object that was created
  .then(
    // success flow, for now is to redirect to all reviews route
    () => res.redirect(`/show/tourdetails/${formData.slug}`),
    err => res.send('error happened')
  )
})

module.exports = router
