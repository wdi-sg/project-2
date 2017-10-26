const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Skill = require('../models/skills')

router.get('/:slug', (req, res) => {
  Skill.find()
  .then(skills => {
    User.findOne({ slug: req.params.slug })
    .then(people => {
      var context = {
        skills: skills,
        peep: people
      }
      res.render('users/card', context)
    })
  })
})

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

router.put('/:slug/settings', (req, res) => {
  var profileData = req.body
  User.findOne({
    slug: req.params.slug
  })
  .then((user) => {
    if (!user.profile.length) {
      user.profile.push({
        nickname: profileData.nickname,
        about: profileData.about,
        skills: profileData.skills,
        projs: profileData.projs,
        contact: profileData.contact
      })
    } else {
      user.profile[0].nickname = profileData.nickname
      user.profile[0].about = profileData.about
      user.profile[0].skills = profileData.skills
      user.profile[0].projs = profileData.projs
      user.profile[0].contact = profileData.contact
    }
    user.save()
    .then(
      user => res.redirect(`/profile/${user.slug}`),
      err => res.send(err)
    )
  })
})

module.exports = router
