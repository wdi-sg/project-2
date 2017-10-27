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

  User.findById(userId) // find user to follow in db
  .then(user => {
    var i = 0
    var followersLen = user.followers.length
    if (user.id !== currUserId) { // if user to follow is not current user
      for (; i < followersLen; i++) { // if current user is already a follower, redirect back to profile
        if (user.followers[i] == currUserId) {
          res.redirect(`/profile/${user.username}`)
          break
        }
      }

      if (i === followersLen) {
        user.followers.push(currUserId) // add current user id to follower list
        user.save()
        .then(() => {
          User.findById(currUserId)
          .then(currUser => {
            currUser.following.push(userId)
            currUser.save()
            .then(() => {
              console.log('added target user to following and current user to target users followers')
              res.redirect(`/`)}
            )
            .catch(err => console.log(err))
          })
        })
        .catch(err => console.log(err))
      }
    }
  })
  .catch(err => console.log(err))
})

module.exports = router
