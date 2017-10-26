const moment = require('moment')
const Quote = require('../models/quote')

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    res.redirect('/')
  } else {
    next()
  }
}

 // the opposite of the function above
const hasLoggedOut = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.redirect('/')
  }
}

const findCurrentQuote = () => {
  var startOfToday = moment().startOf('day')
  var currentHour = moment().hour()
  var timeEvent

  if (currentHour >= 0 && currentHour <= 12) timeEvent = 1
  if (currentHour >= 12 && currentHour <= 18) timeEvent = 2
  if (currentHour >= 18 && currentHour <= 24) timeEvent = 3

  return Quote.find().sort({publishedAt: 1}).findOne({
    timeEvent,
    publishedAt: {
      $gte: startOfToday
    }
  })
 .then(quote => {
   return new Promise( // only when search query yearn output, then return
     (resolve) => { // return quote. Mongoose is async
       if (quote) {
         resolve(quote)
       }
     }
   )
 })
}

module.exports = {
  hasLoggedOut,
  isLoggedIn,
  findCurrentQuote
}
