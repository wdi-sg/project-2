require('colors')
require('dotenv').config({silent: true})
let logging = process.env.LOGGING
const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const Playlist = require('../models/playlist')
const User = require('../models/user')

router.get('/', (req, res) => {
  res.render('index', { title: 'CUE.' })
})

router.use(isLoggedIn)

router.get('/profile', (req, res) => {
  if (logging) console.log('PROFILE ACCESSED BY: '.blue, req.user.name)
  const id = req.user._id
  let ejsObj = {title: 'profile'}
  Playlist.find({creator: id})
    .populate('creator')
    .exec((err, docs) => {
      // res.render('profile', ejsObj)
      ejsObj.playlists = docs
      User.findById(req.user._id)
        .populate({
          path: 'likedPlaylists',
          model: 'Playlist',
          populate: {
            path: 'creator',
            model: 'User'
          }
        })
        .populate({
          path: 'likedPlaylists',
          model: 'Playlist',
          populate: {
            path: 'collaborators',
            model: 'User'
          }
        })
        .exec((err, doc) => {
          ejsObj.likedPlaylists = doc.likedPlaylists
          res.render('profile', ejsObj)
        })
    })
})

module.exports = router
