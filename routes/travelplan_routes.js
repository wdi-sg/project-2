const Travelplan = require('../models/travel')
const express = require('express')
const router = express.Router()
const moment = require('moment')
moment().format()

router.get('/new', (req, res) => {
  res.render('trips/new')
})

router.get('/:id', (req, res) => {
  // instead of find all, we can `findById`
  Travelplan
  .findById(req.params.id) // no need limit since there's only one
  .populate('postby')
  // .populate(<field name>)
  .then(travelplans => {
    res.render('trips/show', {
      travelplans
    })
  })
  .catch(err => {
    console.log(err)
  })
})

// update with the input from form
router.put('/:id', (req, res) => {

  var formData = req.body.trips
  Travelplan.findByIdAndUpdate(req.params.id, {
    title: formData.title,
    address: formData.address,
    category: formData.category,
    date: moment(formData.dateCreated),
    description: formData.description
  })
  .then(() => res.redirect(`/routes/${req.params.id}`))
  .catch(err => console.log(err))
})

// Detele file
router.delete('/:id', (req, res) => {

  Travelplan.findByIdAndRemove(req.params.id)
  .then(() => res.redirect(`/`))
  .catch(err => console.log(err))
})

router.post('/', (req, res) => {
  var formData = req.body.trips

  var newTravelplan = new Travelplan()
  newTravelplan.title = formData.title
  newTravelplan.dateCreated = moment(formData.dateCreated)
  newTravelplan.category = formData.category
  newTravelplan.address = formData.address
  newTravelplan.description = formData.description

  newTravelplan.save()
  // UPDATE. 19 Oct
  .then(
    () => res.redirect(`/routes`),
    err => res.send(err)
  ) // why? mongoose save(), doesn't have .catch()
})




module.exports = router
