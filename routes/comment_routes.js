const Comment = require('../models/comment')
const Location = require('../models/location')
const express = require('express')
const router = express.Router()

// // this shows the comment page with error in showing location parameters
// router.get('/', (req, res) => {
//   res.render('locations/comment')
// })

// router.get('/:id', (req, res) => {
//   Location
//   .findById(req.params.id)
//   .populate('owner')
//   .then(location => {
//     Comment.find({
//       location: location.id
//     })
//     .then(comments =>
//       res.render('locations/comment', {
//         location,
//         comments
//       })
//     )
//     // res.send(location)
//   })
//   .catch(err => {
//     console.log(err)
//   })
// })

// this will show all the comments
router.get('/', (req, res) => {
  Comment.find()
  .populate('author')
  .then(data => res.send(data))
})


router.post('/', (req, res) => {
  var formData = req.body

  var newComment = new Comment({
    description: formData.description,
    author: req.user._id
  })

  newComment.save()
  .then(
    () => res.redirect('/comments'),
    err => res.send('error happened')
  )
})

module.exports = router
