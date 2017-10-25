const express = require('express')
const router = express.Router()
const Quote = require('../models/quote')

// router.get('/collection', (req, res) => {
//   Quote.find()
//   .then(quotes => {
//     // console.log(quotes)
//     res.render('quotes/exploreCollection', { quotes })
//   })
// })

router.get('/collection', (req, res) => {
  var startDate = new Date()  // Current date
  var currentDate = new Date()
  startDate.setDate(startDate.getDate() - 7)
  startDate.setHours(0)
  startDate.setMinutes(0)
  startDate.setSeconds(0)
  Quote.find({publishedAt: { $gte: startDate }, publishedAt: { $lte: currentDate }})
  .then(quotes => {
    res.render('quotes/exploreCollection', { quotes })
  })
})

router.delete('/:id', (req, res) => {
  res.send(req.params.id)
})
// render quotes from the past week
// render 7 days worth of quotes
// show quot

//

module.exports = router
