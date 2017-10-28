const Travelplan = require('../models/travel')
const express = require('express')
const router = express.Router()
const request = require('request-promise-native')

const moment = require('moment')

router.get('/new', (req, res) => {
  res.render('trips/new')
})

router.get('/:id', (req, res) => {
  Travelplan
  .findById(req.params.id) // no need limit since there's only one
  .populate('postby')
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
    // dateCreated: new Date(formData.dateCreated),
    // dateCreated: formData.dateCreated,
    description: formData.description,
    pic: formData.pic
  })
  .then(() => res.redirect(`/routes/${req.params.id}`))
  .catch(err => console.log(err))
})

// Detele file
router.delete('/:id', (req, res) => {

  Travelplan.findByIdAndRemove(req.params.id)
  .then(() => res.redirect(`/routes`))
  .catch(err => console.log(err))
})

router.post('/', (req, res) => {
  var formData = req.body.trips

  var apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${formData.address}&key=${process.env.GOOGLE_API_KEY}`

  request(apiUrl)
  .then(json => {
    var data = JSON.parse(json)
    var latitude = data.results[0].geometry.location.lat
    var longitude = data.results[0].geometry.location.lng
    var geoid = data.results[0].place_id

    var newTravelplan = new Travelplan()
    newTravelplan.title = formData.title
    newTravelplan.dateCreated = formData.dateCreated
    newTravelplan.category = formData.category
    newTravelplan.address = formData.address
    newTravelplan.latitude = latitude
    newTravelplan.longitude = longitude
    newTravelplan.placeId = geoid
    newTravelplan.picture = formData.picture
    newTravelplan.description = formData.description
    newTravelplan.link = formData.link
    newTravelplan.postby = req.user.id

    newTravelplan.save()
    .then(
      // save
      () => res.redirect(`/routes`),
      err => res.send(err)
    )
  })

})

module.exports = router
