const Listings = require('../models/listings')
const Offers = require('../models/offer')
const express = require('express')
const multer = require('multer')
const cloudinary = require('cloudinary')
const upload = multer({ dest: './uploads/' })
const router = express.Router()

router.get('/', (req, res) => {
  Listings
  .find()
  .then(listings =>{
    res.render('listings/listings', {
      listings
    })
  })
  .catch(err =>{
    console.log(err);
  })
})

router.post('/', upload.single('image'), function (req, res) {
    var newList = new Listings({
      photos: req.body.image,
      description: req.body.description,
      title: req.body.title,
      author: req.user.id,
      dealt: false
    })
    newList.save()

    .then(
      () => res.redirect('/listings'),
      err => res.send(err)
    )
})

// router.put('/')

router.get('/requests/:id', (req, res) =>{
  var id = req.params.id
  Listings
  .findOne({
    _id: id
  })
  .then(listing =>{
    Offers.find({ offerId: req.params.id })
    .then(offers =>{
      res.render('listings/requests', {
        listing,offers
      })
    })
  })
  .catch(err =>{
    console.log(err);
  })
})

router.put('/requests/:id', (req, res) => {
  var formData = req.body
  Listings.findByIdAndUpdate(req.params.id, {
    title: formData.title,
    description: formData.description
    })
  .then(() => res.redirect(`/profile/${req.user.username}`))
  .catch(err => console.log(err))
})

router.delete('/requests/:id', (req, res) => {

  Listings.findByIdAndRemove(req.params.id)
  .then(() => res.redirect('/'))
  .catch(err => console.log(err))
})


router.post('/requests/:id',upload.single('image'), (req, res) =>{
    var newOffer = new Offers({
      description: req.body.description,
      photos: req.body.image,
      title: req.body.title,
      offerId: req.params.id,
      author: req.user.id
      })
    newOffer.save()
    .then(
      () => res.redirect('/'),
      err => res.send(err)
    )
})




module.exports = router
