const express = require('express')
const router = express.Router()
const User = require('../models/gigs')

router.get('/', (req, res) => {
  res.redirect('/')
})

router.get('/new-gig', (req, res) => {
  //res.redirect('/')
})

module.exports = router
