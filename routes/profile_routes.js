const passport = require('../config/ppConfig')
const User = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { hasLoggedOut, isLoggedIn } = require('../helpers')

router.get('/', hasLoggedOut, (req, res) => {
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

router.delete('/',hasLoggedOut, (req, res) => {
  // consider add alert screen
  User.findByIdAndRemove(req.user.id)
  .then(() => {
    req.logout()
    res.redirect(`/`)})
    .catch(err => res.send(err))
  })

router.get('/edit', hasLoggedOut, (req,res) => {
  res.render('user/editaccount')
})
router.put('/edit', (req,res) => {
  let updateData = req.body.user
  let newSlug = req.body.user.slug

  if (updateData.name) {
    newSlug = updateData.name.toLowerCase().split(' ').join('-')
  }
  // if (updateData.password) {
  //   bcrypt.hash(updateData.password,10)
  //   .then(hash => {
  //     newPassword = hash
  //   })
  //
  // }
  User.findByIdAndUpdate(req.user.id, {
    name : updateData.name,
    //password : updateData.password, // need to rehash it
    slug : newSlug
  })
  .then(user => res.redirect('/profile'))
  .catch(err => res.send(err))

})

router.get('/:slug', (req, res) => {
  const profileSLug = req.params.slug

  console.log(typeof profileSLug)
  User.find({ slug : profileSLug})
  .populate('pattern')
  .populate('project')
  .then((user) =>{
    const userDetails = user[0]

    res.render('user/otherprofile', {
      userDetails
    })
  })
})





module.exports = router
