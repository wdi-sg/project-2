const User = require('../models/user')
const FixedDeposit = require('../models/fixed-deposit')
const SavingsAccount = require('../models/savings-account')
const Account = require('../models/account')
const express = require('express')
const router = express.Router()

router.get('/:id', (req, res) => {
  Account.findById(
    req.params.id
  )
  .populate('fd')
  .populate('sa')
  .then((account) => {
    res.render('acct_fixed_dep', {account})
  })
})

module.exports = router
