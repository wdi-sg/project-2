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
router.put('/requests/:id', (req, res) => {
  var formData = req.body
  Listings.findByIdAndUpdate(req.params.id, {
    title: formData.title,
    description: formData.description,
    photos: formData.photos
  })
  .then(() => res.redirect(`/restaurants/${req.params.id}`))
  .catch(err => console.log(err))
})

router.delete('/requests/:id', (req, res) => {

  Listings.findByIdAndRemove(req.params.id)
  .then(() => res.redirect('/'))
  .catch(err => console.log(err))
})

router.post('/', upload.single('image'), function (req, res) {
  cloudinary.uploader.upload(req.file.path, function (result) {
    var newList = new Listings({
      photos: result.secure_url,
      description: req.body.description,
      title: req.body.title,
      author: req.user.id
    })
    newList.save()
    .then(
      () => res.redirect('/listings'),
      err => res.send(err)
    )
  })
})

router.get('/requests/:id', (req, res) =>{
  var id = req.params.id
  Listings
  .findOne({
    _id: id
  })
  .then(listing =>{
    Offers.find()
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


  // .then(listings =>{
  //   Offers.find()
  //   .then(Offers =>{
  //     res.render('listings/listings', {
  //       listings,offer
  //     })
  //   }

router.post('/requests/:id', (req, res) =>{
  console.log('hee');
    var newOffer = new Offers({
      description: req.body.description2,
      title: req.body.title2
      })
    newOffer.save()
    res.send('test')
    // .then(
    //   () => res.redirect('/listings/requests/:id'),
    //   err => res.send(err)
    // )
})



module.exports = router
