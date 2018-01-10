const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

const Customer = require('../models/customer')
const OrderedItems = require('../models/ordereditems')


//Index Homepage
exports.index = (req, res)=>{
  Customer.find({},(err, customers)=>{
    console.log(customers)
    if(err) return err

    console.log("hello! customer controller here")
    res.render('customers/index', {'customers' : customers})
  })
}


exports.new = (req, res)=>{
  let customers = new Customer()

  req.checkBody('firstName', 'Fill in the first name field').notEmpty()
  req.checkBody('lastName', 'Fill in the last name field.').notEmpty()
  req.checkBody('roomNumber', 'Fill in the room number field').notEmpty()
  req.checkBody('passcode', 'Fill in the passcode field').notEmpty()
  req.checkBody('tripStart', 'Enter the trip start date').notEmpty()
  req.checkBody('tripEnd', 'Enter the trip end date').notEmpty()


  let validationError = req.validationErrors()
  console.log(validationError);

  if(validationError){
    Customer.find({},(err, customers)=>{
      // console.log(items)
      if(err) return err

      res.render('customers/index', {'customers' : customers, 'errors' : validationError})
    })



  } else{
        //Items Information
        customers.firstName = req.body.firstName
        customers.lastName = req.body.lastName
        customers.roomNumber = req.body.roomNumber
        customers.passcode = req.body.passcode
        customers.tripStart = req.body.tripStart
        customers.tripEnd = req.body.tripEnd

        customers.save((error)=>{
          if(error) console.log(error)
          req.flash('success_msg', "Successfully created")

          res.redirect('/customers')
        })
  }
}

exports.show = (req, res)=>{
  Customer.findOne({_id : req.params.id},(err, customer)=>{
    if(err) return err
    console.log("-----------------------");


    OrderedItems.find({customer_id : req.params.id})
    .populate('item_id')
    .exec((err, orderedItems)=>{
      console.log(orderedItems);
      if(err) return err
      // res.send({
      //   customer,
      //   orderedItems
      // })
      res.render('customers/show', {'customer' : customer, 'orderedItems' : orderedItems})
    })
  })
}
