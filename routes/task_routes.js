const express = require('express')
const router = express.Router()
const Task = require('../models/task')
const Fridge = require('../models/fridge')
const User = require('../models/user')

// Twilio Credentials
const accountSid = process.env.ACCOUNTSID;
const authToken =  process.env.ACCOUNTTOKEN;

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

router.get('/:id/edit', (req, res)=>{
  Task.findById(req.params.id)
  .then(tasks =>{
    res.render('task/edit', {tasks})
  })
})

router.put('/:id/edit', (req, res)=>{
  var formData = req.body
  console.log(req.body)
  Task.findByIdAndUpdate(req.params.id, {
    details:formData.details
  })
  .then((task)=>{
    Task.findById(req.params.id)
    .then(task =>{
      res.redirect(`/fridge/${task.fridge}`)
    })
  })
})
router.put('/:id/editAssignMe', (req, res)=>{
  Task.findByIdAndUpdate(req.params.id, {
    assign: req.user.id
  })
  .then(()=>{
    Task.findById(req.params.id)
    .then(task =>{
      console.log(task)
      res.redirect(`/fridge/${task.fridge}`)
    })
  })
})


router.put('/:id/editAssign', (req, res)=>{
  Task.findByIdAndUpdate(req.params.id, {
    assign: null
  })
  .then(()=>{
    Task.findById(req.params.id)
    .then(task =>{
      console.log(task)
      res.redirect(`/fridge/${task.fridge}`)
    })
  })
})

router.put('/:id/complete', (req, res)=>{
  Task.findByIdAndUpdate(req.params.id,{
    complete:true
  })
  .then(()=>{
    Task.findById(req.params.id)
    .populate({
      path: 'fridge',
      populate: {path: 'members'}
    })
    .then(task =>{
      var Members = task.fridge.members
      Members.forEach((member)=>{
        console.log(member.phoneNumber)
        client.messages
        .create({
          to: `+65${member.phoneNumber}`,
          from: '+17173882453 ',
          body: `${task.details} is completed`,
        })
        .then((message) => console.log(message.sid));
      })

        res.redirect(`/fridge/${task.fridge.id}`)
    })
  })
})

router.post('/', (req,res)=>{
  console.log(req.body)
  var formData = req.body
  var newTask = new Task({
    details: formData.details,
    assign: formData.assign,
    fridge: formData.fridge,
    complete: false
  })
  newTask.save()
  .then(
    tasks =>{
      Fridge.findById(formData.fridge)
      .then(fridgeOne =>{
        fridgeOne.task.push(tasks.id)
        fridgeOne.save()
        console.log(tasks)
        res.redirect(`/fridge/${formData.fridge}`)
      })
  })
})

module.exports = router
