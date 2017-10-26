const Travelplan = require('../models/travel')
const express = require('express')
const router = express.Router()
const request = require('request-promise-native')

const moment = require('moment')

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
  // return res.send(formData)
  //
  // return res.send({
  //   title: formData.title,
  //   address: formData.address,
  //   category: formData.category,
  //   date: new Date(formData.dateCreated),
  //   description: formData.description,
  //   pic: formData.pic
  // })


  Travelplan.findByIdAndUpdate(req.params.id, {
    title: formData.title,
    address: formData.address,
    category: formData.category,
    dateCreated: new Date(formData.dateCreated),
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

    var newTravelplan = new Travelplan()
    newTravelplan.title = formData.title
    newTravelplan.dateCreated = formData.dateCreated
    newTravelplan.category = formData.category
    newTravelplan.address = formData.address
    newTravelplan.latitude = latitude
    newTravelplan.longitude = longitude
    newTravelplan.picture = formData.picture
    newTravelplan.description = formData.description
    newTravelplan.link = formData.link


    newTravelplan.save()
    // UPDATE. 19 Oct
    .then(
      // find current user then save into user.travelplans.push(travelplan.id)
      // save
      () => res.redirect(`/routes`),
      err => res.send(err)
    ) // why? mongoose save(), doesn't have .catch()
  })

})

// router.get("/", (req,res)=>{
//   res.render("new")
// })
// router.post("/tripImage",(req,res)=>{
//   // res.send(req.body)
//   console.log('inside upload button');
// })

module.exports = router
