const Location = require('../models/location')
const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('locations/new')
})

router.get('/:slug', (req, res, next) => {
  var slug = req.params.slug
  if (slug.length === 24) {
    next()
  } else {
    Location.findOne({
      slug
    })
    .populate('owner')
    .then(location => {
      res.render('locations/show', {
        location
      })
    })
  }
})

router.get('/:id', (req, res) => {
  Location
  .findById(req.params.id)
  .populate('owner')
  .then(location => {
    res.render('locations/show', {
      location
    })
  })
  .catch(err => {
    console.log(err)
  })
})

router.put('/:id', (req, res) => {
  var formData = req.body
  Location.findByIdAndUpdate(req.params.id, {
    name: formData.name,
    country: formData.country,
    type: formData.type,
    title: formData.title,
    description: formData.description
  })
  .then(() => res.redirect(`/locations/${req.params.id}`))
  .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  Location.findByIdAndRemove(req.params.id)
  .then(() => res.redirect(`/`))
  .catch(err => console.log(err))
})

router.post('/', (req, res) => {
  var formData = req.body

  var newLocation = new Location()
  newLocation.name = formData.name
  newLocation.country = formData.country
  newLocation.type = formData.type
  newLocation.title = formData.title
  newLocation.description = formData.description

  // newLocation.owner = '59e81ae9c90d27819c166d67'

  newLocation.save()
  .then(
    () => res.redirect(`/locations/${newLocation.id}`),
    err => res.send(err)
  )
})

module.exports = router
