const User = require('../models/user')
const FixedDeposit = require('../models/fixed-deposit')
const SavingsAccount = require('../models/savings-account')
const Account = require('../models/account')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  // return res.send(req.user)
  var user = req.user

  Account.find({
    user: user.id
  })
  .populate('fd')
  .then(accounts => {
    FixedDeposit.find()
    .then((fixedDeposits) => {
      SavingsAccount.find()
      .then((savingsAccount) => {
        res.render('profile', {
          accounts,
          fixedDeposits,
          savingsAccount
        })
      })
    })
  })
  .catch(
    err => console.log(err)
  )
})

router.get('/accounts/:id', (req, res) => {
  res.render('account')
})

router.post('/', (req, res) => {
  var formData = req.body
  var user = req.user

  var newAccount = new Account()
  newAccount.user = user.id
  newAccount.fd = formData.fixedDeposit
  newAccount.amount = formData.amount
  newAccount.period = formData.period

  // return res.send(newAccount)

  newAccount.save()

    .then(
      () => res.redirect(`/profile`),
      err => res.send(err)
    )
})

router.put('/:id', (req, res) => {
  var formData = req.body
  User.findByIdAndUpdate(req.params.id, {
    name: formData.name,
    email: formData.email,
    slug: formData.name.toLowerCase().split(' ').join('-')
  })
  .then(() => res.redirect(`/profile`))
  .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id)
  .then(() => res.redirect(`/`))
  .catch(err => console.log(err))
})

module.exports = router
