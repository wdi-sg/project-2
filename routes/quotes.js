const express = require('express')
const router = express.Router()
const Quote = require('../models/quote')

router.get('/', (req, res) => {
  Quote.find()
  .then(quotes => {
    console.log(quotes)
    res.render('quotes/quote', quotes)
  })
})

module.exports = router
