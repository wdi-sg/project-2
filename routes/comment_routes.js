const Comment = require('../models/comment')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  Comment.find()
  .populate('author')
  // it will go to the field called `author`
  // and look at the schema
  // find what it's referring to
  .then(data => res.send(data))
})


router.post('/', (req, res) => {
  // TODO: link currently logged in User with review form
  var formData = req.body

  var newComment = new Comment({
    description: formData.description,
    author: "59edf139a9500b057fac6b73"
  })

  newComment.save()
  .then(
    () => res.redirect('/comments'),
    err => res.send('error happened')
  )
})

module.exports = router
