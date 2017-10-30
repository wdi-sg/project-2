const Position = require('../models/position')

const express = require('express')

const router = express.Router()
const mongoose = require('mongoose') // for DB

router.get('/', (req, res) => {
  Position.find({ user: req.user.id }).then(position => {
    Position.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id)
        }
      },
      {
        $group: {
          _id: null,

          total: { $sum: { $multiply: ['$units', '$closingPrice'] } }
        }
      }
    ]).then(assetClassPosition => {
      res.render('portfolio', {
        position,
        assetClassPosition
      })
    })
  })
})

router.post('/', (req, res) => {
  var formData = req.body.position

  var newPosition = new Position({
    name: formData.name,
    ticker: formData.ticker,
    buyDate: formData.buyDate,
    units: formData.units,
    price: formData.price,
    assetClass: formData.assetClass,
    amountInvested: formData.amountInvested,
    closingPrice: formData.closingPrice,
    user: req.user.id
  })

  newPosition
    .save()
    .then()
    .then(() => res.redirect('/portfolio'), err => res.send(err))
})

router.get('/:id', (req, res) => {
  Position.findById(req.params.id).then(position => {
    res.render('showandupdate', { position })
  })
})

router.put('/:id', (req, res) => {
  var formData = req.body

  Position.findByIdAndUpdate(req.params.id, {
    closingPrice: formData.closingPrice,
    assetClass: formData.assetClass,
    sellDate: formData.sellDate
  })
    .then(() => res.redirect(`/portfolio`))
    .catch(err => console.log(err))
})

module.exports = router
