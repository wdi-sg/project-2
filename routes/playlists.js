require('colors')
require('dotenv').config({silent: true})
let logging = process.env.LOGGING
const express = require('express')
const router = express.Router()
const Playlist = require('../models/playlist')
// const User = require('../models/user')

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
    if (err) {
      console.log(err.toString().red)
      res.redirect('/playlists/')
    }
    res.redirect('/playlists/'+doc._id)
  })
})

router.post('/:id/add', (req, res) => {
  if (logging) console.log('ADDING TRACK TO PLAYLIST: '.blue, req.user.name)
  const id = req.params.id
  req.body.contributor = req.user._id
  Playlist.findById(id, (err, doc) => {
    if (err) return console.log(err.toString().red)
    doc.tracks.push(req.body)
    if (doc.collaborators.indexOf(req.user._id) < 0) doc.collaborators.push(req.user._id)
    doc.save((err, updated) => {
      if (err) {
        console.log(err.toString().red)
        res.redirect('/playlists/'+id)
      } else {
        if (logging) console.log('TRACK ADDED: '.blue, JSON.stringify(updated,null,4).blue)
        res.redirect('/playlists/'+updated._id)
      }
    })
  })
})

router.get('/:playlistId/up/:trackId', (req, res) => {
  const playlistId = req.params.playlistId
  const trackId = req.params.trackId
  if (logging) console.log('TRACK IS BEING VOTED UP: '.blue, req.user.name)
  Playlist.findById(playlistId, (err, doc) => {
    const toVote = doc.tracks.id(trackId)
    const index = doc.tracks.indexOf(toVote)
    if (index < 0) {
      if (logging) console.log('ERROR: TRACK NOT FOUND'.red)
      res.redirect('/playlists/'+playlistId)
    } else {
      doc.tracks[index].rank++
      doc.save((err, updated) => {
        if (err) return console.log(err)
        res.redirect('/playlists/'+updated._id)
      })
    }
  })
})

router.get('/:playlistId/down/:trackId', (req, res) => {
  const playlistId = req.params.playlistId
  const trackId = req.params.trackId
  if (logging) console.log('TRACK IS BEING VOTED DOWN: '.blue, req.user.name)
  Playlist.findById(playlistId, (err, doc) => {
    const toVote = doc.tracks.id(trackId)
    const index = doc.tracks.indexOf(toVote)
    if (index < 0) {
      if (logging) console.log('ERROR: TRACK NOT FOUND'.red)
      res.redirect('/playlists/'+playlistId)
    } else {
      doc.tracks[index].rank--
      doc.save((err, updated) => {
        if (err) return console.log(err)
        res.redirect('/playlists/'+updated._id)
      })
    }
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
    if (removeIndex < 0) {
      if (logging) console.log('ERROR: TRACK NOT FOUND'.red)
      res.redirect('/playlists/'+playlistId)
    } else {
      doc.tracks.splice(removeIndex, 1)
      doc.save((err, updated) => {
        if (err) return console.log(err.toString().red)
        res.redirect('/playlists/'+updated._id)
      })
    }
  })
})

router.get('/:id/delete', (req, res) => {
  if (logging) console.log('PLAYLIST IS BEING DELETED: '.blue, req.user.name)
  const id = req.params.id
  Playlist.findByIdAndRemove(id, (err) => {
    if (err) return console.log(err.toString().red)
    res.redirect('/profile')
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
      if (err) {
        if (logging) console.log(err.toString().red)
        res.redirect('/playlists')
      } else {
        const options = {path: 'tracks.contributor', model: 'User'}
        Playlist.populate(doc, options, (err, playlist) => {
          // if (logging) console.log(JSON.stringify(doc, null, 4).blue)
          res.render('playlists/single', {title: doc.name, playlist: playlist})
        })
      }
    })
})

module.exports = router
