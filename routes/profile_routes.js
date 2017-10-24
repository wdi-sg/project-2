const User = require('../models/user')
const express = require('express')
const router = express.Router()

router.get('/:slug', (req, res) => {
  var slug = req.user.slug

  res.render('profile')
})

module.exports = router
