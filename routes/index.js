require('colors')
require('dotenv').config({silent: true})
let logging = process.env.LOGGING
const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const Playlist = require('../models/playlist')

router.get('/', (req, res) => {
  res.render('index', { title: 'My App' })
})

router.use(isLoggedIn)

router.get('/profile', (req, res) => {
  if (logging) console.log('PROFILE ACCESSED BY: '.blue, req.user.name)
  const id = req.user._id
  Playlist.find({creator: id})
    .populate('creator')
    .exec((err, docs) => {
      res.render('profile', {title: 'Profile', playlists: docs})
    })
})

module.exports = router
