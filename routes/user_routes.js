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
    var tour = req.body.id

    for (var i = 0; i < userCart.length; i++) {
      if (tour == userCart[i].bookedTour) {
        userCart.splice(i, 1)
        break
      }
    }

    user.save()
    .then(() => res.redirect(`/${req.user.slug}/cart`))
    .catch(err => console.log(err))
  })

    // target the correct tour in the user cart
    // remove tour from user cart
    // save user
    // User.save()
    // .then(() => res.render('users/cart'))
})

module.exports = router
