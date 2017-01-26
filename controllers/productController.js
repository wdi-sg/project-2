const express = require('express')
const Product = require('../models/product')
const Location = require('../models/location')
const router = express.Router()

router.get('/', function (req, res) {
  console.log('getting / and finding')
  Product.find({}, function (err, data) {
    // console.log('what is items passed through', items)
    if (err) {
      req.flash('error', 'Page is not found.')
      res.redirect('/index')
      return
    }
    res.render('profile', {data: data})
  })
})

router.get('/catalogue', function (req, res) {
  console.log('getting / and finding all products')
  Location.find({}, function (err, locationlist) {
    if (err) {
      res.flash('error', 'Unable to populate location')
      res.redirect('/products/profile')
      return
    }
    Product.find({}, function (err, items) {
    // console.log('what is items passed through', items)
      if (err) {
        req.flash('error', 'Cannot find all items.')
        res.redirect('/index')
        return
      }
      res.render('catalogue', {items: items, locationlist: locationlist})
    })
  })
})

router.get('/catalogue/search', function (req, res) {
  console.log('getting / and finding searched products')
  console.log(req.query.productname)
  Location.find({}, function (err, locationlist) {
    if (err) {
      res.flash('error', 'Cannot find search.')
      res.redirect('/products/catalogue')
      return
    }
    Product.find({$or: [{productname: req.query.productname}, {buyerarea: req.query.buyerarea}]}, function (err, items) {
      // console.log('what is items passed through', items)
      if (err) {
        req.flash('error', err.toString())
        // Cannot find search.
        res.redirect('/products/catalogue')
        return
      }
      res.render('catalogue', {items: items, locationlist: locationlist})
    })
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
    upvote: 0,
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
      // return res.send('unsuccessful')
      req.flash('error', err.toString())
      // 'Unable to find the page.
      res.redirect('/products/profile')
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
      // return res.send('unsuccessful')
      req.flash('error', err.toString())
      // 'Unable to find the product.'
      res.redirect('/products/profile')
    }
    res.render('product', {data: data})
  })
})

router.get('/:idx/edit', function (req, res) {
  console.log('to get the product to edit & location')
  Location.find({}, function (err, locationlist) {
    if (err) {
      req.flash('error', err.toString())
      // 'Locations not found.'
      res.redirect('/products/profile')
    }
    Product.findById(req.params.idx)
    .populate('creator')
    .exec(function (err, data) {
      if (err) {
        // return res.send('unsuccessful')
        req.flash('error', err.toString())
        // 'Locations not found.'
        res.redirect('/products/profile')
      }
      res.render('edit', {data: data, locationlist: locationlist})
    })
  })
})

router.put('/:idx', function (req, res) {
  console.log('to update the product')
  Product.findById({_id: req.params.idx})
  .populate('creator')
  .exec(function (err, data) {
    // console.log('getting data to update', data)
    if (err) {
      req.flash('error', err.toString())
      // 'Product cannot be updated.'
    } else {
      data.productname = req.body.productname || data.productname
      data.linkforproduct = req.body.linkforproduct || data.linkforproduct
      data.price = req.body.price || data.price
      data.description = req.body.description || data.description
      data.buyerarea = req.body.buyerarea || data.buyerarea
      data.respondby = req.body.respondby || data.respondby
      data.save(function (err, data) {
        if (err) {
          req.flash('error', err.toString())
          // 'Product cannot be saved'
        }
        req.flash('success', 'Product updated.')
      })
    }
    req.flash('success', 'Product updated.')
    res.redirect('/products/' + req.params.idx)
  })
})

router.delete('/:idx', function (req, res) {
  console.log('to delete the product')
  Product.findOneAndRemove({ _id: req.params.idx },
    function (err) {
      if (err) {
        req.flash('error', err.toString())
        res.redirect('/products/profile')
        // return res.send('unsuccessful')
      }
      res.redirect('/products/')
    })
})

module.exports = router
