const express = require('express')
const Product = require('../models/product')
const Location = require('../models/location')
const router = express.Router()

// to get and find all products created by user
router.get('/', function (req, res) {
  Product.find({}, function (err, data) {
    if (err) {
      req.flash('error', 'Page is not found.')
      res.redirect('/index')
      return
    }
    res.render('profile', {data: data})
  })
})

// to get and find all products with new location list at the catalogue page. also catering for search of locations.
router.get('/catalogue', function (req, res) {
  Location.find({}, function (err, locationlist) {
    if (err) {
      res.flash('error', 'Unable to populate location')
      res.redirect('/products/profile')
      return
    }
    Product.find({}).sort({upvote: -1}).exec(function (err, items) {
      if (err) {
        req.flash('error', 'Cannot find all items.')
        res.redirect('/index')
        return
      }
      res.render('catalogue', {items: items, locationlist: locationlist})
    })
  })
})

// to return the products searched
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
      if (err) {
        req.flash('error', err.toString())
        res.redirect('/products/catalogue')
        return
      }
      res.render('catalogue', {items: items, locationlist: locationlist})
    })
  })
})

// to create new items
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

// to get page for creation of new products
router.get('/new', function (req, res) {
  console.log('get new and render')
  Location.find({}, function (err, locationlist) {
    if (err) {
      req.flash('error', err.toString())
      res.redirect('/products/profile')
    }
    res.render('new', {locationlist: locationlist})
  })
})

// to find product by ID
router.get('/:idx', function (req, res) {
  console.log('get by ID and findbyID')
  Product.findById(req.params.idx)
  .populate('creator')
  .exec(function (err, data) {
    if (err) {
      req.flash('error', err.toString())
      res.redirect('/products/profile')
    }
    res.render('product', {data: data})
  })
})

// to get and update product
router.get('/:idx/edit', function (req, res) {
  console.log('to get the product to edit & location')
  Location.find({}, function (err, locationlist) {
    if (err) {
      req.flash('error', err.toString())
      res.redirect('/products/profile')
    }
    Product.findById(req.params.idx)
    .populate('creator')
    .exec(function (err, data) {
      if (err) {
        req.flash('error', err.toString())
        res.redirect('/products/profile')
      }
      res.render('edit', {data: data, locationlist: locationlist})
    })
  })
})

// to increase likes
router.put('/:idx', function (req, res) {
  Product.findByIdAndUpdate(req.params.idx, {$inc: {upvote: 1}}, function (err, data) {
    if (err) {
      req.flash('error', err.toString())
    }
    res.redirect('/products/catalogue')
  })
})

// to update product
router.put('/:idx', function (req, res) {
  console.log('to update the product')
  Product.findById({_id: req.params.idx})
  .populate('creator')
  .exec(function (err, data) {
    if (err) {
      req.flash('error', err.toString())
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
        }
        req.flash('success', 'Product updated.')
      })
    }
    req.flash('success', 'Product updated.')
    res.redirect('/products/' + req.params.idx)
  })
})

// to delete products
router.delete('/:idx', function (req, res) {
  console.log('to delete the product')
  Product.findOneAndRemove({ _id: req.params.idx },
    function (err) {
      if (err) {
        req.flash('error', err.toString())
        res.redirect('/products/profile')
      }
      res.redirect('/products/')
    })
})

module.exports = router
