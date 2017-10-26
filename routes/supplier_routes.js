const Supplier = require('../models/supplier')
const express = require('express')
const router = express.Router()


router.get('/new',(req,res) => {
  res.render('suppliers/new')
})

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

router.get('/new/:id', (req, res) => {
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
    res.render('suppliers/update', {
      supplier
    })
  })
  .catch(err => {
    console.log(err)
  })
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
    () => res.redirect(`/supplier/new/${newSupplier.id}`),
    err => res.send(err)
  )
})

module.exports = router
