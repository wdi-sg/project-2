const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/cart', (req, res) => {
  console.log('we are in the cart')

  User.findOne({slug: req.user.slug})
  .populate('cart')
  .then(user => {
    console.log(user)
    var context = user.cart
    res.render('users/cart', {
      context
    })
  })
})

module.exports = router
