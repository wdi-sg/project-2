const express = require('express')
const router = express.Router()
const Quote = require('../models/quote')
const User = require('../models/user')

router.get('/', (req, res) => {
  var currentDate = new Date()
  var currentHour = currentDate.getHours()
  var period = {}
  period.publishedAt = currentDate

  if (currentHour >= 3 && currentHour <= 12) period.timeEvent = 1
  if (currentHour >= 12 && currentHour <= 18) period.timeEvent = 2
  if (currentHour >= 18 && currentHour <= 24) period.timeEvent = 3

  var qObj = {
    timeEvent: period.timeEvent,
    publishedAt: {
      $lte: period.publishedAt
    }
  }

  Quote.findOne(qObj)
  .then(quote => {
    res.render('home', { quote })
  })
  .catch(err => console.log(err))
})

router.post('/addcollection', (req, res) => {
  // check you're in this route or not
  var quoteId = req.body.quoteId
  var user = req.user
  User.findByIdAndUpdate(user.id, {
    $push: {
      addedQuotes: quoteId
    }
  })
  .then(() => res.redirect('/profile'))
})

router.get('/profile', (req, res) => {
  const user = req.user
  if (!user) return res.render('home')
  const addedQuotes = user.addedQuotes
  Quote.find({
    '_id': { $in: addedQuotes }
  })
  .then(addedQuotes =>
    res.render('users/profile', { addedQuotes }))
  .catch(err => console.log(err))
})

module.exports = router
