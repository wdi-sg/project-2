const express = require('express')
const router = express.Router()
const Task = require('../models/task')
const Fridge = require('../models/fridge')
const User = require('../models/user')

// routes
// router.get('/new', (req,res)=>{
//   Fridge.find({})
//   .then(fridges => {
//     console.log(this)
//     res.render('task/new')
//   })
// })

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
    details: formData.details,
    assign: formData.assign
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
    .then(task =>{
      console.log(task)
      res.redirect(`/fridge/${task.fridge}`)
    })
  })
})

router.post('/', (req,res)=>{
  console.log(req.body)
  var formData = req.body
  var newTask = new Task({
    details: formData.details,
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
