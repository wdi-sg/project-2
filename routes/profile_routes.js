const passport = require('../config/ppConfig')
const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  //const currentUserId = req.user.id
  // res.redirect(`/profile/${currentUserId}`)
  User
  .findById(req.user.id)
  .populate('pattern')
  .populate('bookmark')
  .populate('project')
  .then(user => {
    res.render('user/profile', {
      user
    })
  })
  .catch(err => {
    res.send(err)
  })
})


router.put('/', (req,res) => {
  let updateData = req.body.user
  const newSlug = req.body.user.slug
  if (updateData.name) {
    newSlug = updateData.name.toLowerCase().split(' ').join('-')
  }
  User.findByIdAndUpdate(req.user.id, {
    name : updateData.name,
    //password : updateData.password, // need to rehash it
    slug : newSlug
  })
})

router.delete('/', (req, res) => {
  // consider add alert screen
  User.findByIdAndRemove(req.user.id)
  .then(() => res.redirect(`/`))
  .catch(err => res.send(err))
})




module.exports = router
