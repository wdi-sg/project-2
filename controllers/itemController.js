const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

const Item = require('../models/item')


//Index Homepage
exports.index = (req, res)=>{
  Item.find({},(err, items)=>{
    // console.log(items)
    if(err) return err

    console.log("hello! item controller here")
    res.render('items/index', {'items' : items})
  })
}

// This allows the posting of new items
exports.new = (req, res)=>{
  let items = new Item()

  req.checkBody('name', 'Fill in the name field').notEmpty()
  req.checkBody('price', 'Fill in the price field. Must be a number').notEmpty()
  req.checkBody('total_stock', 'Fill in the stock field').notEmpty()


  let validationError = req.validationErrors()
  console.log(validationError);

  if(validationError){
    Item.find({},(err, items)=>{
      // console.log(items)
      if(err) return err

      res.render('items/index', {'items' : items, 'errors' : validationError})
    })


  } else{
        //Items Information
        items.name = req.body.name
        items.price = req.body.price
        items.total_stock = req.body.total_stock

        items.save((error)=>{
          if(error) console.log(error)
          req.flash('success_msg', "Successfully created")

          console.log('test1 here1')

          res.redirect('/items')
        })
  }
}

// This allows the updating of items
exports.update = (req, res)=>{

  req.checkBody('name', 'Fill in the name field').notEmpty()
  req.checkBody('price', 'Fill in the price field. Must be a number').notEmpty()
  req.checkBody('total_stock', 'Fill in the stock field').notEmpty()


  let validationError = req.validationErrors()

  if(validationError){
    res.render('items/index', {'items' : items, 'errors' : validationError})

  } else{
    Item.findOne({_id: req.params.id}, (err, items)=>{
      //Items Information
      items.name = req.body.name
      items.price = req.body.price
      items.total_stock = req.body.total_stock

      items.save((error)=>{
        if(error) console.log(error)
        req.flash('success_msg', "Successfully created")

        res.redirect('/items')
      })
    })
  }
}
