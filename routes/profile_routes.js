const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Fridge = require('../models/fridge')

router.get('/', (req, res)=>{
    User.findById(req.user.id)
    .populate('fridges')
    .then(members =>
      res.render('profile', {
        members
      })
    )
    .catch(err => {
      console.log(err)
    })
})

router.get('/edit', (req,res)=>{
  var user = req.user
  res.render('profileEdit', {user})
})

router.put('/edit', (req, res)=>{
  var user =req.user
  var formData=req.body.user
  User.findOneAndUpdate({name: user.name}, {
    name: formData.name,
    email: formData.email,
    phoneNumber: formData.phoneNumber
  })
  .then(()=>{
    res.redirect('/profile')
  })
})

module.exports = router
