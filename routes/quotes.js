const express = require('express')
const router = express.Router()
const Quote = require('../models/quote')
const User = require('../models/user')

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
  var userId = req.user.id
  var quoteId = req.params.id
  console.log(quoteId)

  User.findById(userId)
  .then((user) => {
    var addedQuotes = user.addedQuotes
    var index = addedQuotes.indexOf(quoteId)
    if (index !== -1) { addedQuotes.splice(index, 1) }
    user.addedQuotes = addedQuotes

    user.save()
    .then(() => res.redirect(`/profile/${slugName}`), err => console.log(err))
  })
  .catch(err => console.log(err))
})

module.exports = router
