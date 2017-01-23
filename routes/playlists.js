require('colors')
require('dotenv').config({silent: true})
let logging = process.env.LOGGING
const express = require('express')
const router = express.Router()
const Playlist = require('../models/playlist')

router.get('/', (req, res) => {
  res.render('playlists', { title: 'Playlists' })
})

router.get('/destroyall', (req, res) => {
  Playlist.remove({}, (err) => {
    if (err) return console.log(err)
    if (logging) console.log('ALL PLAYLISTS HAVE BEEN REMOVED FROM THE DATABASE'.bold.underline.red)
    res.redirect('/')
  })
})

module.exports = router
