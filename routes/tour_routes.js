const express = require('express')
const router = express.Router()

const Tour = require('../models/tour')
const Show = require('../models/show')


router.get('/', (req, res) => {
  Show.find({})
  .then(tours => {
    console.log(tours);
    res.render('./tours/new', {
      data: tours
    })
  })
})

// CREATE ONE
router.post('/', (req, res) => {
  var formData = req.body
  var newTour = new Tour()
  newTour.showname = formData.showname
  newTour.name = formData.name
  newTour.slug = formData.name.toLowerCase().split(' ').join('-')
  newTour.overview = formData.overview
  newTour.highlights = formData.highlights
  newTour.price = formData.price
  newTour.pictureurl1 = `${formData.pictureurl}nth/0/`
  newTour.pictureurl2 = `${formData.pictureurl}nth/1/`
  newTour.pictureurl3 = `${formData.pictureurl}nth/2/`
  newTour.save()
  .then(
    () => {
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
  Tour.findByIdAndRemove(req.params.id)
  .then(() => res.redirect(`/`))
  .catch(err => console.log(err))
})

module.exports = router
