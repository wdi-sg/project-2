const express = require("express")
const router = express.Router()

const Thread = require('../models/threads')
const Answer = require("../models/answers")
const User = require("../models/user")

router.post('/upvote', function (req, res) {
  var inc = parseFloat(req.body.current)
  res.setHeader('Content-Type', 'application/json')
  User.findById(req.user.id)
  .then(userFound=>{
    var threadUp = userFound.threadUp
    var index = threadUp.indexOf(req.body.obj)
    if(index !== -1) {
      res.send(JSON.stringify(inc))
    }
    else if(index === -1 ){
      inc +=1
      var threadDown = userFound.threadDown
      var downIndex = threadDown.indexOf(req.body.obj)
      if(downIndex !== -1) threadDown.splice(index, 1)
      userFound.threadUp.push(req.body.obj)
      userFound.save()
      res.send(JSON.stringify(inc))
      var vote = parseFloat(req.body.up)
      vote +=1
      Thread.findByIdAndUpdate(req.body.obj, { $set: { totalVotes: inc, upVotes: vote }}, (err, output) => {
        if (err) console.log(err)

      })
    }

  })
  // var inc = parseFloat(req.body.current)
  // res.setHeader('Content-Type', 'application/json')
  // inc += 1
  // res.send(JSON.stringify(inc))
  // console.log(req.body)
  // var vote = parseFloat(req.body.up)
  // vote +=1
  // Thread.findByIdAndUpdate(req.body.obj, { $set: { totalVotes: inc, upVotes: vote }}, (err, output) => {
  //   if (err) console.log(err)
  //   // console.log(output);
  //
  // })
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
