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
  var profileData = req.body
  User.findOne({
    slug: req.params.slug
  })
  .then((user) => {
    user.profile.push({
      nickname: profileData.nickname,
      about: profileData.about,
      skills: profileData.skills,
      projs: profileData.projs,
      contact: profileData.contact
    })
    user.save()
    .then(
      user => res.redirect(`/profile/${user.slug}`),
      err => res.send(err)
    )
  })
})

module.exports = router
