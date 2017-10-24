const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/:slug', (req, res) => {
  User.findOne({
    slug: req.params.slug
  })
  .then((user) => {
    res.render('users/card', {
      user
    })
  })
})

 /* Need to fix this flow. */
router.get('/:slug/settings', (req, res) => {
  User.findOne({
    slug: req.params.slug
  })
  .then((user) => {
    res.render('users/profile', {
      user
    })
  })
})

router.post('/:slug/settings', (req, res) => {
  res.send(req.body)
  // need to tie the req.body into a user
})

module.exports = router
