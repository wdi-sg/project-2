const express = require('express')
const router = express.Router()

const episodeController = require('../controllers/episode_controller')

router.get('/:id', function (req, res) {
  res.render('episode/episode')
})

router.post('/', episodeController.create)

module.exports = router
