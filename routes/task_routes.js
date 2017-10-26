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

router.post('/', (req,res)=>{
  var formData = req.body
  User.find({name:formData.assign})
  .then(users=>{
    var newTask = new Task({
      details: formData.details,
      assign: users[0].id,
      fridge: formData.fridge,
      complete: "false"
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
})

module.exports = router
