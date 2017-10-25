const express = require('express')
const router = express.Router()
const Quote = require('../models/quote')


router.get('/collection', (req, res) => {
  var startDate = new Date()  // Current date
  var currentDate = new Date()
  startDate.setDate(startDate.getDate() - 7) // render last 7 days quotes
  startDate.setHours(0)
  startDate.setMinutes(0)
  startDate.setSeconds(0)
  Quote.find({publishedAt: { $gte: startDate }, publishedAt: { $lte: currentDate }})
  .then(quotes => {
    res.render('quotes/exploreCollection', { quotes })
  })
})

router.delete('/:id', (req, res) => {
  var slugName = req.user.slug
  var quoteId = req.params.id
  Quote.findByIdAndRemove(quoteId)
  .then(() => res.redirect(`/profile/${slugName}`))
  .catch(err => console.log(err))
})

module.exports = router
