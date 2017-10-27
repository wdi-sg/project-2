const express = require('express')
const router = express.Router()
const Gig = require('../models/gigs')

router.get('/new-gig', (req, res) => {
  res.render('../views/gigs/new-gig')
})

router.post('/new-gig', (req, res) => {
  var formData = req.body
  var newGig = new Gig({
    name: formData.name,
    dates: formData.deadline,
    specs: formData.specs,
    wage: formData.wage,
    description: formData.description,
    skills: formData.skills,
    author: formData.userID
  })
  newGig.save()
  .then(
    (gig) => res.redirect(`/gigs/${gig.slug}`),
    err => res.send(err)
  )
})

router.get('/:slug', (req, res) => {
  Gig.findOne({
    slug: req.params.slug
  }).populate('author')
  .then((gig) => {
    // res.send(req.user.name)
    res.render('../views/gigs/gig-card', {
      gig
    })
  })
})

router.post('/:slug', (req, res) => {
  Gig.findOne({
    slug: req.params.slug
  })
  .then((gig) => {
    res.redirect(`/gigs/${gig.slug}/edit`)
  })
})

router.get('/:slug/edit', (req, res) => {
  Gig.findOne({
    slug: req.params.slug
  })
  .then((gig) => {
    res.render('../views/gigs/edit', {
      gig
    })
  })
})

router.put('/:slug/edit', (req, res) => {
  var newGigData = req.body
  Gig.findOne({
    slug: req.params.slug
  })
  .then((gig) => {
    gig.name = newGigData.name
    gig.dates = newGigData.dates
    gig.specs = newGigData.specs
    gig.wage = newGigData.skills
    gig.description = newGigData.description
    gig.skills = newGigData.skills
    gig.save()
  .then(
    (gig) => res.redirect(`/gigs/${gig.slug}`),
    err => res.send(err)
  )
  })
})

module.exports = router
