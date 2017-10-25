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
    deadline: formData.date,
    specs: formData.specs,
    wage: formData.wage,
    description: formData.description,
    author: formData.userID
  })
  newGig.save()
  .then(
    (user) => res.redirect('/'),
  //   /* later need to add in the redirect to the gig card page itself */
    err => res.send(err)
  )
})

module.exports = router
