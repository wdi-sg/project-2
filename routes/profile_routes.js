const User = require('../models/user')
const Listings = require('../models/listings')
const Offers = require('../models/offer')
const express = require('express')
const router = express.Router()

router.get('/:slug', (req, res) => {
  Listings
  .find({author: req.user.id})
  .then(listings =>{
    res.render('users/show', {
      listings
    })
  })
  .catch(err =>{
    console.log(err);
  })
})

router.get('/:slug/offers', (req, res) => {
  Offers
  .find({author: req.user.id})
  .then(offers =>{
    res.render('users/myoffers', {
      offers
    })
  })
  .catch(err =>{
    console.log(err);
  })
})

module.exports = router
