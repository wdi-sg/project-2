const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/user[name]', (req, res) => {
  var name = req.user.name

  res.render('profile')
})

module.exports = router
