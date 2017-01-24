const express = require('express')
const Product = require('../models/product')
const Location = require('../models/location')
// const Msg = require('../models/msg')
const router = express.Router()

router.get('/', function (req, res) {
  console.log('getting / and finding')
  Product.find({}, function (err, data) {
    // console.log('what is items passed through', items)
    if (err) {
      res.send('unsuccessful get of all product listings by user')
      return
    }
    res.render('profile', {data: data})
  })
})
// {title: 'Your To Do Lists', listname: listname}

router.get('/catalogue', function (req, res) {
  console.log('getting / and finding all products')
  Product.find({}, function (err, items) {
    // console.log('what is items passed through', items)
    if (err) {
      res.send('unsuccessful get of all product listings')
      return
    }
    res.render('catalogue', {items: items})
  })
})

router.post('/', function (req, res) {
  console.log('getting / and creating', req.user.id, req.body)
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
    console.log('post /', data)
    if (err) {
      req.flash('error', err.toString())
      res.redirect('/products/new')
      return
    }
    res.redirect('/products/' + data._id)
  })
})

router.get('/new', function (req, res) {
  console.log('get new and render')
  Location.find({}, function (err, locationlist) {
    // console.log('what is location', locationlist[0].districts)
    if (err) {
      return res.send('unsuccessful')
    }
    res.render('new', {locationlist: locationlist})
  })
})

router.get('/:idx', function (req, res) {
  console.log('get by ID and findbyID')
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
  console.log('to get the product to edit')
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
  console.log('to update the product')
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
    // console.log('getting data to update', data)
    if (err) {
      return res.send('unsuccessful')
    }
    res.redirect('/products/' + req.params.idx)
  })
})

router.delete('/:idx', function (req, res) {
  console.log('to delete the product')
  Product.findOneAndRemove({ _id: req.params.idx },
    function (err) {
      if (err) {
        return res.send('unsuccessful')
      }
      res.redirect('/profile')
    })
})

module.exports = router
