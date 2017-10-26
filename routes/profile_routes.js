const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/:username', (req, res) => {
  var username = req.user.username

  res.render('profile')
})

module.exports = router
