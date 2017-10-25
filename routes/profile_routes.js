const User = require('../models/user')
const FixedDeposit = require('../models/fixed-deposit')
const express = require('express')
const router = express.Router()

router.get('/:slug', (req, res) => {
//   // var fixedDeposits = this
//   FixedDeposit.find()
//   .then((fixedDeposits) => {
//     res.send(fixedDeposits)
//   })
  res.render('profile')
})

// router.post('/:slug', (req, res) => {
//   // var fixedDeposits = this
//   let fixedDeposits = fs.readFileSync('./data.json')
//   fixedDeposits = JSON.parse(fixedDeposits)
//
//   fixedDeposits.push(req.body)
//
//   fs.writeFileSync('./data.json', JSON.stringify(fixedDeposits))
//   res.render('/:slug')
// })

// router.put('/profile/:name', (req, res) => {
//   var formData = req.body
//   User.findByIdAndUpdate(req.params.id, {
//     name: formData.name,
//     email: formData.email
//   })
//   .then(() => res.redirect(`/profile/${req.params.name}`))
//   .catch(err => console.log(err))
// })
//
router.delete('/profile/:name', (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => res.redirect(`/`))
    .catch(err => console.log(err))
})

module.exports = router
