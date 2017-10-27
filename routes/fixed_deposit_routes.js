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
  console.log(req.body)
  var period = req.body.period
  var deposit = req.body.amount
  console.log(deposit)

  FixedDeposit.find(
    { "interest_rate.0.type" : "period" },
    { "interest_rate.rate" : 1 }
  ).then((data) =>
    FixedDeposit.returns.updateMany((deposit * (1 + ((Account.ir/100)/4))^((period)/4)) - deposit)
  ).then((returns) =>
    res.redirect('/fixed-deposit')
    .catch(err => console.log(err))
  )
})

  // var interest = FD.annual_interest_rate.toString().values(month)

  // for (var period in FD.annual_interest_rate) {
  //   if (FixedDeposit.annual_interest_rate.hasOwnProperty(period)) {
  //     FixedDeposit.find({
  //       fixed_deposits.annual_interest_rate.period
  //     })
  //     .populate(interest)
  //     .then(() => {
  //       var takeAway
  //       = {(deposit * (1 + ((interest/100)/4))^((period.split('')[0])/4)) - deposit
  //     })}
  //     .then(() => {
  //       res.render('bank-account/fixed_deposit', {FixedDeposit.returns.push(takeAway)})
  //      })
  //    }
  //  }

// Fomula:
// A = P x (1 + r/n)nt
// I = A - P
//  Where,
// A = Maturity Value
// P = Principal Amount
// r = Rate of Interest
// t = Number of Period
// n = Compounded Interest Frequency
// I = Interest Earned Amount

module.exports = router
