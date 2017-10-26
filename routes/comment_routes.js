const Comment = require('../models/comment')
const Location = require('../models/location')
const express = require('express')
const router = express.Router()

// this will show all the comments
router.get('/', (req, res) => {
  Comment.find()
  .populate('author')
  .populate('location')
  .then(data => res.send(data))
})

router.post('/', (req, res) => {
  // return res.send(req.body)

  var formData = req.body

  var newComment = new Comment({
    description: formData.description,
    author: req.user._id,
    name: req.user.name,
    location: formData.parent
  })

  // return res.send(newComment)

  newComment.save()
  .then(
    () => {
      res.redirect(`/locations/${formData.parent}/comment`)
    },
    err => res.send('error happened')
  )
})

router.delete('/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id)
  .then((removedComment) => {
    res.redirect(`/locations/${removedComment.location}/comment`)
  })
  .catch(err => console.log(err))
})

module.exports = router
