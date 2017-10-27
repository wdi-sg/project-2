const User = require('../models/user')
const SavingsAccount = require('../models/savings-account')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  FixedDeposit.find()
  .then((fixedDeposits) => {
    res.render('profile', {fixedDeposits})
  })
})

module.exports = router
