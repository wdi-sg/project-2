const express = require('express')
const router = express.Router()
const voteController = require('../controllers/vote_controllers')

function authenticatedUser (req, res, next) {
  if (req.isAuthenticated()) return next()
  req.flash('message', 'Login to access!')
  res.redirect('/login')
}

router.post('/', authenticatedUser, voteController)

module.exports = router
