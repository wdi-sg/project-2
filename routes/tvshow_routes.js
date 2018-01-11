const express = require('express')
const router = express.Router()

const Tvshow = require('../models/show')

router.get('/', (req, res) => {
  res.render('./tvshows/new')
})

// CREATE ONE
router.post('/', (req, res) => {
  var formData = req.body
  var newTvShow = new Tvshow()
  newTvShow.name = formData.name
  newTvShow.description = formData.description
  newTvShow.showpic = formData.showpic
  newTvShow.slug = formData.name.toLowerCase().split(' ').join('')
  newTvShow.save()
  .then(
    () => {
      res.redirect(`/addtvshows/${newTvShow.id}`)
    },
    err => res.send(err)
  )
})

// READ ONE
router.get('/:id', (req, res) => {
  Tvshow
    .findById(req.params.id)
    .then(show => {
      res.render('tvshows/show', {
        show
      })
    })
    .catch(err => {
      console.log(err)
    })
})

// UPDATE ONE
router.put('/:id', (req, res) => {
  var formData = req.body
  Tvshow.findByIdAndUpdate(req.params.id, {
    name: formData.name
  })
  .then(() => res.redirect(`/addtvshows/${req.params.id}`))
  .catch(err => console.log(err))
})

// DELETE ONE
router.delete('/:id', (req, res) => {
  Tvshow.findByIdAndRemove(req.params.id)
  .then(() => res.redirect(`/`))
  .catch(err => console.log(err))
})

module.exports = router
