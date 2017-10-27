const express = require('express')
const router = express.Router()

const Thread = require('../models/threads')
const Answer = require('../models/answers')

router.post('/', function (req, res) {
  var author = 'anonymous'
  var authorName = 'anonymous'
  if (req.user) {
    author = req.user.id
    authorName = req.user.name
  }
  console.log('Added new answer =>', req.body)
  let newAnswer = new Answer({
    description: req.body.userinput,
    parent: req.body.id,
    creator: author,
    creatorName: authorName
  })
  newAnswer.save()
  .then(() => {
    res.redirect(`/thread/${req.body.id}`)
  })
})

router.put('/threadpage/:id', (req, res) => {
  // res.send(req.body)
  Answer.findByIdAndUpdate(req.params.id, {description: req.body.answerNew})
.then(() => {
  req.flash('info', `Answer Updated!`)
  res.redirect(`/thread/${req.body.threadId}`)
})
})

// delete button from threads page
router.delete('/threadpage', (req, res) => {
  console.log("sent over from ajax",req.body.divId)
  Answer.findByIdAndRemove(req.body.divId)
  .then((result) => {
    res.send(JSON.stringify(result))
  })
  .catch(err => console.log(err))
})



router.delete('/profile/:id', (req, res) => {
  console.log(req)
  Answer.findByIdAndRemove(req.params.id)
  .then(() => {
    req.flash('info', `Deleted answer (id: ${req.params.id})`)
    res.redirect(`/profile`)
  })
  .catch(err => console.log(err))
})

module.exports = router
