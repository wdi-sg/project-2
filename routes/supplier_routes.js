const Supplier = require('../models/supplier')
const express = require('express')
const router = express.Router()

//create new supplier
router.get('/new',(req,res) => {
  res.render('suppliers/new')
})

//get a list of supplier
router.get('/',(req,res) => {
  Supplier.find()
  .then(suppliers => {
    // at this point we got our data so we can render our page

    res.render('suppliers/listOfSuppliers', {
      suppliers
      // remember object literal on es6, we don't need to type in pairs
      // if key and argument is the same name
      // i.e. restaurants: restaurants
    })
  })
  .catch(err => {
    console.log(err)
  })
})
//update the supplier
router.get('/update/:id', (req, res) => {
  // instead of find all, we can `findById`
  Supplier
  .findById(req.params.id) // no need limit since there's only one
  .populate('owner')
  // .populate(<field name>)
  .then(supplier => {
    // not restaurants, cos it's single restaurant

    // PITSTOP: look at the views folders here, compare it with the res.render
    // first argument

    res.render('suppliers/update', {
      supplier
    })
  })
  .catch(err => {
    console.log(err)
  })
})

router.get('/:id', (req, res) => {
  // instead of find all, we can `findById`
  console.log('entered')
  Supplier
  .findById(req.params.id) // no need limit since there's only one
  .populate('owner')
  // .populate(<field name>)
  .then(supplier => {
    // not restaurants, cos it's single restaurant

    // PITSTOP: look at the views folders here, compare it with the res.render
    // first argument

    // res.send(restaurant)
    console.log('populated')
    res.render('vegetables/view', {
      supplier
    })
  })
  .catch(err => {
    console.log(err)
  })
})

router.put('/update/:id', (req, res) => {
  // thankfully since we're using mongoose
  // we don't have to find and update separately
  // there's a method in mongoose just for that
  // `findByIdAndUpdate` http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate

  var formData = req.body.supplier
  Supplier.findByIdAndUpdate(req.params.id, {
    company : formData.txtName,
    email : formData.txtEmail,
    contact : formData.txtContact,
    address : formData.txtAddress,
    unit : formData.txtUnit,
    postalcode : formData.txtPostalCode
  })
  .then(() => res.redirect(`/supplier`))
  .catch(err => console.log(err))
  // after update is done, redirect back to resto id
  // this redirection can go to anywhere as long as you have the routes with you
})

router.delete('/update/:id', (req, res) => {
  // (AGAIN) thankfully since we're using mongoose
  // there's a method in mongoose just for that
  // `findByIdAndRemove` http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove

  Supplier.findByIdAndRemove(req.params.id)
  .then(() => res.redirect(`/supplier`))
  .catch(err => console.log(err))
  // after delete is done, redirect back to home page
  // (cos the current restaurant page is gone)
  // this redirection can go to anywhere as long as you have the routes with you
})


router.post('/',(req,res) => {
  var formData = req.body.supplier

  var newSupplier = new Supplier()
  newSupplier.company = formData.txtName
  newSupplier.email = formData.txtEmail
  newSupplier.contact = formData.txtContact
  newSupplier.address = formData.txtAddress
  newSupplier.unit = formData.txtUnit
  newSupplier.postalcode = formData.txtPostalCode

  newSupplier.save()
  .then(
    () => res.redirect(`/supplier/update/${newSupplier.id}`),
    err => res.send(err)
  )
})

module.exports = router
