const express = require('express')
const router = express.Router()
const Stop = require('../models/stop')
const findNearest = require('../helpers/findNearest.js')
const geoMapKey = process.env.GEO //pass to google maps url in frontend.js
//Phase 2 - Todo
//get user fave stops if any, and render on view.

//load home view
router.get('/', (req, res) => {
  res.render('home')
})

//load nearest stops
router.post('/', (req, res) => {
  Stop.find()
    .then(stops => (findNearest(stops, req.body)))
    .then(nearest => {
      res.send({  nearest,  geoMapKey  })
    })
})
module.exports = router

//29 Oct moved findNearest function to helpers folder
