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
    username: req.user.id,
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
    res.redirect('/products/:idx')
  })
})

router.get('/new', function (req, res) {
  res.render('new')
})

router.get('/:idx', function (req, res) {
  console.log('what is product find looking for', Product.findById(req.params.idx))
  Product.findById(req.params.idx, function (err, data) {
    if (err) {
      return res.send('unsuccessful')
    }
    res.render('product')
  })
})

// params is for routing
// body is for request

// router.get('/:idx/edit', function (req, res) {
//   res.render('edit', {id: req.params.idx})
// })
//
// router.put('/:idx', function (req, res) {
//   Todo.update({_id: req.params.idx}, {$set: {
//     name: req.body.name,
//     description: req.body.description,
//     completed: req.body.completed
//   }},
//     {runValidators: true})
//     .populate('username')
//     .exec(function (err, todo) {
//       if (err) return res.send('unsuccessful')
//       res.redirect(`/todos/${req.params.idx}`)
//     })
// })
// router.delete('/:idx', function (req, res) {
//   Todo.findOneAndRemove({ _id: req.params.idx }).populate('username').exec(function (err) {
//     if (err) return res.send('unsuccessful')
//     res.redirect('/todos')
//   })
// })

module.exports = router
