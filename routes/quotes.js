const express = require('express')
const router = express.Router()
const Quote = require('../models/quote')
const User = require('../models/user')

// show quote collection for past 7 days
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
// delete quote from profile collection
router.delete('/:id', (req, res) => {
  var slugName = req.user.slug
  var userId = req.user.id
  var quoteId = req.params.id

  User.findById(userId)
  .then((user) => {
    var addedQuotes = user.addedQuotes
    console.log(addedQuotes)
    var index = addedQuotes.indexOf(quoteId)
    if (index !== -1) { addedQuotes.splice(index, 1) }
    user.addedQuotes = addedQuotes

    user.save()
    .then(() => res.redirect(`/profile/${slugName}`), err => console.log(err))
  })
  .catch(err => console.log(err))
})

router.get('/addQuote', (req, res) => {
  res.render('quotes/addQuote')
})

// add data into user profile
router.post('/addQuote', (req, res) => {
  var user = req.user
  var formData = req.body
  var newQuote = new Quote()
  newQuote.author = formData.author
  newQuote.quote = formData.quote
  newQuote.creatorId = user.id
  newQuote.save()
  .then(() => {
    res.redirect('addQuote')
  })
})

// Get Personal Quote ID to UPDATE
router.get('/:id', (req, res) => {
  var quoteId = req.params.id
  Quote.findById(quoteId)
  .then(quote => {
    res.render('quotes/updateQuote', { quote })
  })
  .catch(err => console.log(err))
})

// Update Personal Quote
router.put('/:id', (req, res) => {
  var quoteId = req.params.id
  var formData = req.body
  Quote.findByIdAndUpdate(quoteId, {
    author: formData.author,
    quote: formData.quote
  })
  .then(() => res.redirect(`/quotes/${quoteId}`))
  .catch(err => console.log(err))
})

module.exports = router
