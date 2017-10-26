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

module.exports = router
