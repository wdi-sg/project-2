const SavingsAccount = require('../models/savings-account')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  SavingsAccount.find()
  .then((savingsAccounts) => {
    res.render('bank-account/savings-account', {savingsAccounts})
  })
})

module.exports = router
