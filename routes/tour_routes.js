const express = require('express')
const router = express.Router()

const Tour = require('../models/tour')

router.get('/', (req, res) => {
  res.render('./tours/new')
})

// CREATE ONE
router.post('/', (req, res) => {
  var formData = req.body
  var newTour = new Tour()
  newTour.showname = formData.showname
  newTour.name = formData.name
  newTour.overview = formData.overview
  newTour.highlights = formData.highlights
  newTour.dates = formData.dates
  newTour.save()
  .then(
    () => {
      console.log(`${newTour.id}`)
      res.redirect(`/addtours/${newTour.id}`)
    },
    err => res.send(err)
  )
})

// READ ONE
router.get('/:id', (req, res) => {
  Tour
  .findById(req.params.id)
  .then(tour => {
    res.render('tours/show', {
      tour
    })
  })
  .catch(err => {
    console.log(err)
  })
})

// UPDATE ONE
router.put('/:id', (req, res) => {
  var formData = req.body
  Tour.findByIdAndUpdate(req.params.id, {
    // showname: formData.showname,
    name: formData.name,
    overview: formData.overview,
    highlights: formData.highlights,
    dates: formData.dates
  })
  .then(() => res.redirect(`/addtours/${req.params.id}`))
  .catch(err => console.log(err))
})

// DELETE ONE
router.delete('/:id', (req, res) => {
  Show.findByIdAndRemove(req.params.id)
  .then(() => res.redirect(`/`))
  .catch(err => console.log(err))
})

module.exports = router
