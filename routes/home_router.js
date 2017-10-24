const express = require('express')
const router = express.Router()
const Quote = require('../models/quote')
const User = require('../models/user')

// create function to know whether morning, afternoon, evening
// return function output
// Quote.find function output.
router.get('/', (req, res) => {
  var currentDate = new Date()
  var currentHour = currentDate.getHours()
  var period = {}

  if (currentHour >= 3 && currentHour <= 12) period.timeEvent = 'morning'
  else if (currentHour >= 12 && currentHour <= 18) period.timeEvent = 'afternoon'
  else period.timeEvent = 'evening'

  // period.p ublishedAt; //

  Quote.findOne({
    timeEvent: period.timeEvent,
    // hasShown: false
  })
  .then(quote => {
    // index++
    // how do i increment count on my collection of quotes
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

  // res.send(user)
  // if (!user) return res.send('Please log in to add quote to collection')
  //
  // var addQuoteIntoUser = user.quote
  // console.log(addQuoteIntoUser)
  // User.findById(userId)
  // .then(user => {
  // })
})
// if quote exist in collection return if quote exist, prompt message, sorry the quote already exist.
// else search for user ID from User DB
// Push Quote ID into quote in user.
// redirect user into profile page.

router.get('/profile', (req, res) => {
  const user = req.user
  if (!user) return res.render('home')
  const quote = Quote.find({})
  // find user by their quote
  // got to make the add quote work first.
  res.render('users/profile', {user, quote})
})

module.exports = router
