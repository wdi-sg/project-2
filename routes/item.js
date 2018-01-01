const express = require('express')
const router = express.Router()

const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

const Item = require('../models/item')
// const Author = require('../models/author')

router.get('/', (req, res)=>{
  // res.send('books/index')
  Item.find({},(err, items)=>{
    console.log(items)
    if(err) return err

    res.render('items/index', {'items' : items})
  })
})


// router.get('/new', (req, res)=>{
//   Author.find()
//   .exec((err, authors)=>{
//     // find all Author and execute whatever
//     if(err) console.log(err)
//
//     res.render('books/create', {"authors" : authors})
//
//     // Author.find({}, (err, authors) =>{
//     //   if(err) console.log(err)
//     //
//     //   res.render('books/create', {authors : authors})
//     // })
//   })
// })

router.get('/new', (req, res)=>{
  res.render('items/create')
})


//saving into databsae..
//   router.post('/new', (req, res)=>{
//     let items = new Item()
//
//     // books.author = req.body.author // dropdown for author
//     req.checkBody('name', 'Fill in the name field').notEmpty()
//     req.checkBody('price', 'Fill in the price field. Must be a number').isNumeric().notEmpty()
//     req.checkBody('total_stock', 'Fill in the stock field').notEmpty()
//
//
//     let validationError = req.validationErrors()
//     console.log(validationError);
//
//     if(validationError){
//       res.render('items/create', { 'errors' : validationError })
//     } else{
//           //Items Information
//           items.name = req.body.name
//           items.price = req.body.price
//           items.total_stock = req.body.total_stock
//           // items.author = author._id //Manual entering of author
//
//           items.save((error)=>{
//             if(error) console.log(error)
//             req.flash('success_msg', "Successfully created")
//
//             res.redirect('/items')
//           })
//     }
//
//
//
//   console.log(req.body)
// })


// Find books, check value of authors, check if the information in authors matches, and then send me book
//This appears as book.author.blah blah in show.handlebars
router.get('/show/:id', (req, res)=>{
  Item.findOne({ _id : req.params.id})
  .exec((err, item) =>{
    if(err) console.log(err)

    res.render('items/show', {item : item})
  })

})

//This one writes to mongodb with objectID, but we're trying to use mongoose
// router.get('/show/:id', (req, res)=>{
//   Book.findOne({_id : ObjectId(req.params.id)}, (err, books)=>{
//     if(err) console.log(err)
//     console.log(books)
//     console.log("heya ")
//
//     res.render('books/show', {'books' : books})
//   })
// })

module.exports = router
