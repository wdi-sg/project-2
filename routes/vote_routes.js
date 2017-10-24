const express = require("express")
const router = express.Router()

const Thread = require('../models/threads')
const Answer = require("../models/answers")

router.post('/upvote', function (req, res) {
  var inc = parseFloat(req.body.current)
  res.setHeader('Content-Type', 'application/json')
  inc += 1
  res.send(JSON.stringify(inc))
  console.log(req.body)
  var vote = parseFloat(req.body.up)
  vote +=1
  Thread.findByIdAndUpdate(req.body.obj, { $set: { totalVotes: inc, upVotes: vote }}, (err, output) => {
    if (err) console.log(err)
    // console.log(output);

  })
})
router.post('/downvote', function (req, res) {
  var dec = parseFloat(req.body.current)
  res.setHeader('Content-Type', 'application/json')
  dec -= 1
  res.send(JSON.stringify(dec))
  console.log(req.body)
  var vote = parseFloat(req.body.down)
  vote +=1

  Thread.findByIdAndUpdate(req.body.obj, { $set: { totalVotes: dec, downVotes: vote }}, (err, output) => {
    if (err) console.log(err)
    // console.log(output);
  })
})

router.post('/ansupvote', function (req, res) {
  var inc = parseFloat(req.body.current)
  res.setHeader('Content-Type', 'application/json')
  inc += 1
  res.send(JSON.stringify(inc))
  console.log(req.body)
  var vote = parseFloat(req.body.up)
  vote +=1

  Answer.findByIdAndUpdate(req.body.obj, { $set: { totalVotes: inc, upVotes: vote }}, (err, output) => {
    if (err) console.log(err)
    // console.log(output);
  })
})

router.post('/ansdownvote', function (req, res) {
  var dec = parseFloat(req.body.current)
  res.setHeader('Content-Type', 'application/json')
  dec -= 1
  res.send(JSON.stringify(dec))
  console.log(req.body)
  var vote = parseFloat(req.body.down)
  vote +=1

  Answer.findByIdAndUpdate(req.body.obj, { $set: { totalVotes: dec, downVotes: vote }}, (err, output) => {
    if (err) console.log(err)
    // console.log(output);
  })
})
module.exports = router
