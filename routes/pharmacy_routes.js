const LisPharmacy = require('../models/lispharmacy')
const RetPharmacy = require('../models/retpharmacy')
const express = require('express')
const router = express.Router()

router.get('/user[name]', (req, res) => {
  var name = req.user.name

  res.render('home')
})

module.exports = router
