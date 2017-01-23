require('colors')
require('dotenv').config({silent: true})
let logging = process.env.LOGGING
const express = require('express')
const router = express.Router()
const Playlist = require('../models/playlist')

router.get('/', (req, res) => {
  // res.render('playlists', { title: 'Playlists' })
  Playlist.find({})
    .populate('creator')
    .populate({
      path: 'collaborators',
      model: 'User'
    })
    .exec((err, docs) => {
      if (err) return console.log(err)
      if (logging) console.log('PLAYLISTS ACCESSED BY: '.blue, req.user.name, ', FOUND'.blue, docs.length, 'PLAYLISTS'.blue)
      res.send(docs)
    })
})

router.get('/destroyall', (req, res) => {
  Playlist.remove({}, (err) => {
    if (err) return console.log(err)
    if (logging) console.log('ALL PLAYLISTS HAVE BEEN REMOVED FROM THE DATABASE'.bold.underline.red)
    res.redirect('/')
  })
})

router.post('/create', (req, res) => {
  if (logging) console.log('PLAYLIST CREATE REQUEST RECEIVED FROM: '.blue, req.user.name)
  req.body.creator = req.user._id
  req.body.collaborators.push(req.user._id)
  Playlist.create(req.body, (err, doc) => {
    if (err) return console.log(err)
    res.send(doc)
  })
})

router.get('/:id', (req, res) => {
  if (logging) console.log('SINGLE PLAYLIST ACCESSED BY: '.blue, req.user.name)
  const id = req.params.id
  Playlist.findById(id)
    .populate('creator')
    .populate({
      path: 'collaborators',
      model: 'User'
    })
    .exec((err, doc) => {
      if (err) return console.log(err)
      res.send(doc)
    })
})

module.exports = router
