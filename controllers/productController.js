const express = require('express')
const Product = require('../models/product')
const Location = require('../models/location')
const router = express.Router()

router.get('/', function (req, res) {
  Product.find({}, function (err, items) {
    if (err) {
      res.send('unsuccessful get of all product listings')
      return
    }
    res.render('catalogue')
  })
})
// {title: 'Your To Do Lists', listname: listname}

router.post('/', function (req, res) {
  Product.create({
    creator: req.user.id,
    productname: req.body.productname,
    linkforproduct: req.body.linkforproduct,
    price: req.body.price,
    description: req.body.description,
    buyerarea: req.body.buyerarea,
    productdatecreated: Date.now(),
    respondby: req.body.respondby
  },
  function (err, data) {
    if (err) {
      res.send('unsuccessful')
      return
    }
    res.redirect('/products/' + data._id)
  })
})

router.get('/new', function (req, res) {
  res.render('new')
})

router.get('/:idx', function (req, res) {
  Product.findById(req.params.idx)
  .populate('creator')
  .exec(function (err, data) {
    if (err) {
      return res.send('unsuccessful')
    }
    res.render('product', {data: data})
  })
})
router.get('/:idx/edit', function (req, res) {
  Product.findById(req.params.idx)
  .populate('creator')
  .exec(function (err, data) {
    if (err) {
      return res.send('unsuccessful')
    }
    res.render('edit', {data: data})
  })
})

router.put('/:idx', function (req, res) {
  Product.update({_id: req.params.idx}, {$set: {
    productname: req.body.productname,
    linkforproduct: req.body.linkforproduct,
    price: req.body.price,
    description: req.body.description,
    buyerarea: req.body.buyerarea,
    respondby: req.body.respondby
  }},
  {runValidators: true})
  .populate('creator')
  .exec(function (err, data) {
    console.log('getting data to update', data)
    if (err) {
      return res.send('unsuccessful')
    }
    res.redirect('/products/' + req.params.idx)
  })
})

router.delete('/:idx', function (req, res) {
  Product.findOneAndRemove({ _id: req.params.idx },
    function (err) {
      if (err) {
        return res.send('unsuccessful')
      }
      res.redirect('/todos')
    })
})

module.exports = router
