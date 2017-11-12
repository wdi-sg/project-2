const User = require('../models/user')
const express = require('express')
const router = express.Router()
const passport = require('../config/ppConfig')

// show /browse
router.get('/', (req, res) => {
  res.render('browse/search')
})

// show /browse/:bookID
router.get('/:id', (req, res) => {
  var getLink = 'https://www.googleapis.com/books/v1/volumes/' + req.params.id
  console.log('getLink: ' + getLink)
  $.get(getLink)
  .done(function (response) {
    console.log(response)
  })
  res.render('browse/bookDetails')
})

module.exports = router
