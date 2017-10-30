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
})

router.post('/downvote', function (req, res) {
  var dec = parseFloat(req.body.current)
  res.setHeader('Content-Type', 'application/json')
  User.findById(req.user.id)
  .then(userFound=>{
    var threadDown = userFound.threadDown
    var index = threadDown.indexOf(req.body.obj)
    if(index !== -1) {
      res.send(JSON.stringify(dec))
    }
    else if(index === -1 ){
      dec -=1
      var threadUp = userFound.threadUp
      var upIndex = threadUp.indexOf(req.body.obj)
      if(upIndex !== -1) threadUp.splice(index, 1)
      userFound.threadDown.push(req.body.obj)
      userFound.save()
      res.send(JSON.stringify(dec))
      var vote = parseFloat(req.body.down)
      vote +=1
      Thread.findByIdAndUpdate(req.body.obj, { $set: { totalVotes: dec, downVotes: vote }}, (err, output) => {
        if (err) console.log(err)

      })
    }

  })
})

router.post('/ansupvote', function (req, res) {
  var inc = parseFloat(req.body.current)
  res.setHeader('Content-Type', 'application/json')
  User.findById(req.user.id)
  .then(userFound=>{
    var answerUp = userFound.answerUp
    var index = answerUp.indexOf(req.body.obj)
    if(index !== -1) {
      res.send(JSON.stringify(inc))
    }
    else if(index === -1 ){
      inc +=1
      var answerDown = userFound.answerDown
      var downIndex = answerDown.indexOf(req.body.obj)
      if(downIndex !== -1) answerDown.splice(index, 1)
      userFound.answerUp.push(req.body.obj)
      userFound.save()
      res.send(JSON.stringify(inc))
      var vote = parseFloat(req.body.up)
      vote +=1
      Answer.findByIdAndUpdate(req.body.obj, { $set: { totalVotes: inc, upVotes: vote }}, (err, output) => {
        if (err) console.log(err)

      })
    }

  })
})
router.post('/ansdownvote', function (req, res) {
  var dec = parseFloat(req.body.current)
  res.setHeader('Content-Type', 'application/json')
  User.findById(req.user.id)
  .then(userFound=>{
    var answerDown = userFound.answerDown
    var index = answerDown.indexOf(req.body.obj)
    if(index !== -1) {
      res.send(JSON.stringify(dec))
    }
    else if(index === -1 ){
      dec -=1
      var answerUp = userFound.answerUp
      var upIndex = answerUp.indexOf(req.body.obj)
      if(upIndex !== -1) answerUp.splice(index, 1)
      userFound.answerDown.push(req.body.obj)
      userFound.save()
      res.send(JSON.stringify(dec))
      var vote = parseFloat(req.body.down)
      vote +=1
      Answer.findByIdAndUpdate(req.body.obj, { $set: { totalVotes: dec, downVotes: vote }}, (err, output) => {
        if (err) console.log(err)

      })
    }

  })
})

//== KEEP FOR FUTURE REFERENCE IF NECESSARY ==//
// router.post('/downvote', function (req, res) {
//   var dec = parseFloat(req.body.current)
//   res.setHeader('Content-Type', 'application/json')
//   dec -= 1
//   res.send(JSON.stringify(dec))
//   console.log(req.body)
//   var vote = parseFloat(req.body.down)
//   vote +=1
//
//   Thread.findByIdAndUpdate(req.body.obj, { $set: { totalVotes: dec, downVotes: vote }}, (err, output) => {
//     if (err) console.log(err)
//     // console.log(output);
//   })
// })
//============================================//

module.exports = router
