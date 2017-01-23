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
      if (err) return console.log(err.toString().red)
      if (logging) console.log('PLAYLISTS ACCESSED BY: '.blue, req.user.name, ', FOUND'.blue, docs.length, 'PLAYLISTS'.blue)
      // if (logging) console.log('PLAYLISTS FOUND: '.blue, JSON.stringify(docs, null, 4).blue)
      res.render('playlists', {title: 'Playlists', playlists: docs})
    })
})

router.get('/destroyall', (req, res) => {
  Playlist.remove({}, (err) => {
    if (err) return console.log(err.toString().red)
    if (logging) console.log('ALL PLAYLISTS HAVE BEEN REMOVED FROM THE DATABASE'.bold.underline.red)
    res.redirect('/')
  })
})

router.get('/create', (req, res) => {
  res.render('playlists/create', {title: 'Create a Playlist'})
})

router.post('/create', (req, res) => {
  if (logging) console.log('PLAYLIST CREATE REQUEST RECEIVED FROM: '.blue, req.user.name)
  req.body.creator = req.user._id
  req.body.collaborators = []
  req.body.collaborators.push(req.user._id)
  if (logging) console.log(JSON.stringify(req.body, null, 4).blue)
  Playlist.create(req.body, (err, doc) => {
    if (err) return console.log(err.toString().red)
    res.redirect('/playlists/'+doc._id)
  })
})

router.post('/:id/add', (req, res) => {
  if (logging) console.log('ADDING TRACK TO PLAYLIST: '.blue, req.user.name)
  const id = req.params.id
  Playlist.findById(id, (err, doc) => {
    if (err) return console.log(err.toString().red)
    doc.tracks.push(req.body)
    doc.save((err, updated) => {
      if (err) return console.log(err.toString().red)
      // res.send(updated)
      res.redirect('/playlists/'+updated._id)
    })
  })
})

router.get('/:playlistId/delete/:trackId', (req, res) => {
  if (logging) console.log('TRACK IS BEING DELETED FROM PLAYLIST: '.blue, req.user.name)
  const playlistId = req.params.playlistId
  const trackId = req.params.trackId
  Playlist.findById(playlistId, (err, doc) => {
    if (err) return console.log(err.toString().red)
    const toRemove = doc.tracks.id(trackId)
    const removeIndex = doc.tracks.indexOf(toRemove)
    doc.tracks.splice(removeIndex, 1)
    doc.save((err, updated) => {
      if (err) return console.log(err.toString().red)
      res.redirect('/playlists/'+updated._id)
    })
  })
})

router.get('/:id/delete', (req, res) => {
  if (logging) console.log('PLAYLIST IS BEING DELETED: '.blue, req.user.name)
  const id = req.params.id
  Playlist.findByIdAndRemove(id, (err) => {
    if (err) return console.log(err.toString().red)
    res.redirect('/playlists')
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
      if (err) return console.log(err.toString().red)
      // res.send(doc)
      res.render('playlists/single', {title: doc.name, playlist: doc})
    })
})

module.exports = router
