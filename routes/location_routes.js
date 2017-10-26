const Location = require('../models/location')
const Comment = require('../models/comment')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: './uploads/' })
const cloudinary = require('cloudinary')

router.get('/new', (req, res) => {
  res.render('locations/new')
})

// to view update/delete
router.get('/:id', (req, res) => {
  Location
  .findById(req.params.id)
  .populate('owner')
  .then(location => {
    Comment.find({
      location: location.id
    })
    .then(comments => {
      // var user = req.user
      // res.send({
      //   location,
      //   comments,
      //   user
      // })

      res.render('locations/show', {
        location,
        comments
      })
    })
    // res.send(location)
  })
  .catch(err => {
    console.log(err)
  })
})

router.get('/:id/edit', (req, res) => {
  Location
  .findById(req.params.id)
  .populate('owner')
  .then(location => {
    Comment.find({
      location: location.id
    })
    .then(comments =>
      res.render('locations/edit', {
        location,
        comments
      })
    )
    // res.send(location)
  })
  .catch(err => {
    console.log(err)
  })
})

// to view add comment
router.get('/:id/comment', (req, res) => {
  Location
  .findById(req.params.id)
  .populate('owner')
  .then(location => {
    Comment.find({
      location: location.id
    })
    .then(comments => {
      console.log(comments)
      res.render('locations/show', {
        location,
        comments
      })
    }
    )
    // res.send(location)
  })
  .catch(err => {
    console.log(err)
  })
})

router.put('/:id', upload.single('image'), (req, res) => {
  var file = req.file
  cloudinary.uploader.upload(file.path, (result) => {
    var formData = req.body
    Location.findByIdAndUpdate(req.params.id, {
      name: formData.name,
      country: formData.country,
      type: formData.type,
      title: formData.title,
      description: formData.description,
      image: result.secure_url
    })
  .then(() => res.redirect(`/locations/${req.params.id}`))
  .catch(err => console.log(err))
  })
})

router.delete('/:id', (req, res) => {
  Location.findByIdAndRemove(req.params.id)
  .then(() => res.redirect(`/`))
  .catch(err => console.log(err))
})

router.post('/', upload.single('image'), (req, res) => {
  cloudinary.uploader.upload(req.file.path, (result) => {
    var formData = req.body

    var newLocation = new Location()
    newLocation.name = formData.name
    newLocation.country = formData.country
    newLocation.type = formData.type
    newLocation.title = formData.title
    newLocation.description = formData.description
    newLocation.image = result.secure_url
    newLocation.owner = req.user._id

    newLocation.save()
    .then(
      () => res.redirect(`/locations/${newLocation.id}`),
      err => res.send(err)
    )
  })
})

module.exports = router
