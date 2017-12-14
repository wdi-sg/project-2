const FixedDeposit = require('../models/fixed-deposit')
const Account = require('../models/account')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  FixedDeposit.find()
  .then((fixedDeposits) => {
    res.render('bank-account/fixed-deposit', {fixedDeposits})
  })
})

router.put('/', (req, res, next) => {
  var period = req.body.period
  var deposit = req.body.amount

  FixedDeposit.find(
    { 'interest_rate.0.type': 'period' },
    { 'interest_rate.rate': 1 }
  ).then((data) =>
    FixedDeposit.returns.updateMany((deposit * (1 + ((data / 100) / 4)) ^ ((period) / 4)) - deposit)
  ).then((returns) =>
    res.redirect('/fixed-deposit', {returns})
    .catch(err => console.log(err))
  )
})

module.exports = router
