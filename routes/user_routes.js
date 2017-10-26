const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Tour = require('../models/tour')

// PRINT TOUR IN CART
router.get('/cart', (req, res) => {
  User.findOne({slug: req.user.slug})
  .populate('cart.bookedTour')
  .then(user => {
    var cart = user.cart
    res.render('users/cart', { userCart: cart })
  })
})

// DELETE TOUR IN CART
router.delete('/cart', (req, res) => {
  User.findOne({slug: req.user.slug})
  .then(user => {
    var userCart = user.cart
    var tour = req.body
    console.log(tour)

    // target the correct tour in the user cart
    // remove tour from user cart
    // save user
  })
})
  // Tour.findByIdAndRemove(this._id)
  // .populate('slug')
  // .then(() => res.render('users/cart'))
  // .catch(err => console.log(err))

module.exports = router
