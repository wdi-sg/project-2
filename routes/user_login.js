const express = require('express')
const router = express.Router()
const passport = require('../config/ppConfig')

router.get('/', (req, res) => {
  res.render('users/login')
})

router.post('/', passport.authenticate('local'), (req, res) => {
  res.redirect(`/profile/${req.user.slug}`)
})

module.exports = router
