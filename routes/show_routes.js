const express = require('express')
const router = express.Router()

// const Show = require('../models/show')
const Tour = require('../models/tour')
const User = require('../models/user')
const Review = require('../models/review')

// Prints tours based on shows
router.get('/:name', (req, res) => {
  Tour.find({showname: req.params.name})
  .then(tours => {
    res.render('show/show_tourlist', {
      data: tours
    })
  })
})

// Prints review
router.get('/tourdetails/:slug', (req, res) => {
  Tour.find({slug: req.params.slug})
  .then(tours => {
    Review.find({tourSlug: tours[0].slug})
      .populate('author')
      .limit(5)
      .then((reviews) => {
        res.render('show/show_tourdetails', {
          data: tours[0],
          reviews
        })
      })
  })
})

// SAVE TOUR TO CART
router.post('/tourdetails/:slug', (req, res) => {
  Tour.findOne({slug: req.params.slug}) // takes :name from previous line and uses it to find the tour obj
  .then(tour => { // the result is named called tour and passed as an argument
    var tourId = tour._id // this is the tour's id
    var userId = req.user.id // this is the current logged in user's id
    var date = req.body.datechosen

    var selectedTour = {
      tourDate: date,
      bookedTour: tourId
    }

    User.findById(userId)
    .then(user => {
      user.cart.push(selectedTour)
      user.save()
      .then(() => res.redirect('/'))
    })
  })
})

module.exports = router
