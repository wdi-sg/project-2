const CreditCard = require('../models/credit-card')
const express = require('express')
const router = express.Router()

// router.get('/', (req, res) => {
//   CreditCard.find()
//   .then(creditcards => {
//     CreditCard.distinct('type')
//     .then(types => {
//       res.render('credit-card', {creditcards, types})
//     })
//   })
// })
//
// router.post('/search', (req, res) => {
//   const keyword = req.body.keyword
//   const regex = new RegExp(keyword, 'i')
//
//   CreditCard.find({
//     type: regex
//   })
//   .limit(20)
//   .then(creditcards => res.send(creditcards))
//   .catch(err => res.send(err)) // in case we have an error
// })

module.exports = router
