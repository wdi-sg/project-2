const User = require('../models/user')
const FixedDeposit = require('../models/fixed-deposit')
const Account = require('../models/account')
const express = require('express')
const router = express.Router()

router.get('/:id', (req, res) => {
  res.render('account')
})

module.exports = router
