const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/:username', (req, res) => {
  var username = req.params.username
  User.findOne({ username:username })
  .then(currentUser => res.render('profile', { currentUser }))
})

router.post('/', (req, res) => {
  var username = req.body.username
  res.redirect(`/profile/${username}`)
})

router.put('/:username/follow', (req, res) => {
  var userId = req.body.id // user to follow
  var currUserId = req.user.id // current user
  console.log('userId: ', userId)
  console.log('currUserId: ', currUserId)
  console.log('currUserName: ', req.user.name)
  User.findById(userId)
  .then(user => {
    if(user.id !== currUserId) {
      console.log("found user's username: ", user.username)
      console.log('not current user')

      // check if currUserId already exists in followers array
      // if not, push

      user.following.push(currUserId)
      user.save()
      .then(() => {
        console.log('saved!')
        res.redirect('/')
      })
    }
  })
})

module.exports = router
