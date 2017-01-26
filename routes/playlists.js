require('colors')
require('dotenv').config({silent: true})
let logging = process.env.LOGGING
const express = require('express')
const router = express.Router()
const Playlist = require('../models/playlist')
const User = require('../models/user')

router.get('/', (req, res) => {
  Playlist.find({})
    .populate('creator')
    .populate({
      path: 'collaborators',
      model: 'User'
    })
    .exec((err, docs) => {
      if (err) return console.log(err.toString().red)
      if (logging) console.log('PLAYLISTS ACCESSED BY: '.blue, req.user.name, ', FOUND'.blue, docs.length, 'PLAYLISTS'.blue)
      res.render('playlists', {title: 'playlists', header:'this is where the playlists live. get grooving.', playlists: docs})
    })
})

router.get('/destroyall', (req, res) => {
  if (process.env.NODE_ENV === 'test') {
    Playlist.remove({}, (err) => {
      if (err) return console.log(err.toString().red)
      if (logging) console.log('ALL PLAYLISTS HAVE BEEN REMOVED FROM THE DATABASE'.bold.underline.red)
    })
  }
  res.redirect('/')
})

router.get('/create', (req, res) => {
  res.render('playlists/create', {title: 'create a playlist'})
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

router.post('/search', (req, res) => {
  const search = new RegExp(req.body.search.toString(), 'i')
  console.log(search.blue)
  if (logging) console.log('PLAYLIST SEARCH BY'.blue, req.user.name, 'FOR:'.blue, search)
  Playlist.find({name: search})
    .populate('creator')
    .populate({
      path: 'collaborators',
      model: 'User'
    })
    .exec((err, docs) => {
      if (err) return console.log(err)
      res.render('playlists', {title: 'search', header: 'search results for: '+ req.body.search, playlists: docs})
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
    doc.save((err) => {
      if (err) console.log(err.toString().red)
      res.redirect('/playlists/'+id)
    })
  })
})

router.get('/:playlistId/like', (req, res) => {
  if (logging) console.log('PLAYLIST LIKED BY: '.blue, req.user.name)
  const playlistId = req.params.playlistId
  const userId = req.user._id
  User.findById(userId, (err, doc) => {
    if (err) {
      console.log(err)
      res.redirect('/playlists/'+playlistId)
    } else {
      doc.likedPlaylists.push(playlistId)
      doc.save((err) => {
        if (err) return console.log(err)
        res.redirect('/playlists/'+playlistId)
      })
    }
  })
})

router.get('/:playlistId/unlike', (req, res) => {
  if (logging) console.log('PLAYLIST UNLIKED BY: '.blue, req.user.name)
  const playlistId = req.params.playlistId
  const userId = req.user._id
  User.findById(userId, (err, doc) => {
    if (err) {
      console.log(err)
      res.redirect('/playlists/'+playlistId)
    } else {
      const index = doc.likedPlaylists.indexOf(playlistId)
      if (index < 0) res.redirect('/playlists/'+playlistId)
      else {
        doc.likedPlaylists.splice(index, 1)
        doc.save((err) => {
          if (err) return console.log(err)
          res.redirect('/playlists/'+playlistId)
        })
      }
    }
  })
})

router.post('/:playlistId/comment', (req, res) => {
  if (logging) console.log('COMMENT MADE BY: '.blue, req.user.name)
  const playlistId = req.params.playlistId
  const userId = req.user._id
  req.body.author = userId
  Playlist.findById(playlistId, (err, doc) => {
    if (err) return console.log(err)
    doc.comments.push(req.body)
    doc.save((err) => {
      if (err) return console.log(err)
      res.redirect('/playlists/'+playlistId)
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

router.get('/:playlistId/delete', (req, res) => {
  if (logging) console.log('PLAYLIST IS BEING DELETED: '.blue, req.user.name)
  const id = req.params.playlistId
  Playlist.findByIdAndRemove(id, (err) => {
    if (err) return console.log(err.toString().red)
    res.redirect('/profile')
  })
})

router.get('/:playlistId/:vote/:trackId', (req, res) => {
  const playlistId = req.params.playlistId
  const trackId = req.params.trackId
  const vote = req.params.vote
  Playlist.findById(playlistId, (err, doc) => {
    const toVote = doc.tracks.id(trackId)
    const index = doc.tracks.indexOf(toVote)
    if (index < 0) {
      if (logging) console.log('ERROR: TRACK NOT FOUND'.red)
      res.redirect('/playlists/'+playlistId)
    } else {
      if (vote === 'up') {
        if (logging) console.log('TRACK IS BEING VOTED UP: '.blue, req.user.name)
        doc.tracks[index].rank++
      } else if (vote === 'down') {
        if (logging) console.log('TRACK IS BEING VOTED DOWN: '.blue, req.user.name)
        doc.tracks[index].rank--
      }
      doc.save((err, updated) => {
        if (err) return console.log(err)
        res.redirect('/playlists/'+updated._id)
      })
    }
  })
})

router.get('/:playlistId', (req, res) => {
  if (logging) console.log('SINGLE PLAYLIST ACCESSED BY: '.blue, req.user.name)
  const id = req.params.playlistId
  Playlist.findById(id)
    .populate('creator')
    .populate({
      path: 'comments.author',
      model: 'User'
    })
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
          // if (logging) console.log(JSON.stringify(req.user, null, 4).blue)
          res.render('playlists/single', {title: doc.name, playlist: playlist})
        })
      }
    })
})

module.exports = router
