const express = require('express')
const Product = require('../models/product')
const Msg = require('../models/msg').model
const router = express.Router()

router.post('/:idx/message', function (req, res) {
  // console.log('1')
  // console.log('get by ID and findbyID')
  Product.findById(req.params.idx, function (err, product) {
    if (err) {
      return res.send('unsuccessful')
    }
    // console.log('2', product)
    console.log(req.user.name, 'for messages')
    Msg.create({
      creatorname: req.user.name,
      comment: req.body.comment,
      commentdatecreated: Date.now()
    }, function (err, msg) {
      if (err) {
        return res.send('unsuccessful')
      }
      product.msgboard.push(msg)
      product.save()
      res.redirect('/products/' + req.params.idx)
    })
  })
})

module.exports = router
