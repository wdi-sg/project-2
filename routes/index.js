const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' })
})

router.get('/profile', (req, res) => {
  res.redirect('/')
})

module.exports = router
