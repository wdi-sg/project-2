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
  var quoteId = req.body.quoteId
  var user = req.user
  var slug = req.user.slug
  // check if quotes are alr added by user
  var quotesArr = user.addedQuotes
  if (quotesArr.indexOf(quoteId) !== -1) return res.redirect('/quotes/collection')

  User.findByIdAndUpdate(user.id, {
    $push: {
      addedQuotes: quoteId
    }
  })
  .then(() => res.redirect(`/profile/${slug}`))
})

router.get('/profile/:slug', (req, res) => {
  const user = req.user
  console.log(!user)
  // why did this not work
  if (!user) {
    console.log('user has not logged in')
    return res.render('home')
  }
  const addedQuotes = user.addedQuotes
  Quote.find({
    '_id': { $in: addedQuotes }
  })
  .then(addedQuotes =>
    res.render('users/myCollection', { addedQuotes, user }))
  .catch(err => console.log(err))
})

module.exports = router
