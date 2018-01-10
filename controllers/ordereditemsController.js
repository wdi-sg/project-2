// const MongoClient = require('mongodb').MongoClient
// const ObjectId = require('mongodb').ObjectID
//
// const OrderedItems = require('../models/ordereditems')
//
//
// // This allows the posting of new items
// exports.order = (req, res)=>{
//   let orderedItems = new OrderedItems()
//
//   req.checkBody('name', 'Fill in the name field').notEmpty()
//   req.checkBody('price', 'Fill in the price field. Must be a number').notEmpty()
//   req.checkBody('total_stock', 'Fill in the stock field').notEmpty()
//
//
//   let validationError = req.validationErrors()
//   console.log(validationError);
//
//   if(validationError){
//     Item.find({},(err, items)=>{
//       // console.log(items)
//       if(err) return err
//
//       res.render('items/index', {'items' : items, 'errors' : validationError})
//     })
//
//
//   } else{
//         //Items Information
//         items.name = req.body.name
//         items.price = req.body.price
//         items.total_stock = req.body.total_stock
//
//         items.save((error)=>{
//           if(error) console.log(error)
//           req.flash('success_msg', "Successfully created")
//
//           res.redirect('/')
//         })
//   }
// }
