const Supplier = require('../models/supplier')
const express = require('express')
const router = express.Router()

//create new supplier
router.get('/new', (req, res) => {
  res.render('suppliers/new')
})

//get a list of supplier
router.get('/', (req, res) => {
  Supplier.find()
    .then(suppliers => {

      res.render('suppliers/listOfSuppliers', {
        suppliers
      })
    })
    .catch(err => {
      console.log(err)
    })
})

//update the supplier
router.get('/update/:id', (req, res) => {

  Supplier
    .findById(req.params.id)
    .populate('owner')
    .then(supplier => {

      res.render('suppliers/update', {
        supplier
      })
    })
    .catch(err => {
      console.log(err)
    })
})

//get id to populate
router.get('/:id', (req, res) => {

  console.log('entered')
  Supplier
    .findById(req.params.id)
    .populate('owner')
    .then(supplier => {

      res.render('vegetables/view', {
        supplier
      })
    })
    .catch(err => {
      console.log(err)
    })
})

router.put('/update/:id', (req, res) => {

  var formData = req.body.supplier
  Supplier.findByIdAndUpdate(req.params.id, {
      company: formData.txtName,
      email: formData.txtEmail,
      contact: formData.txtContact,
      address: formData.txtAddress,
      unit: formData.txtUnit,
      postalcode: formData.txtPostalCode
    })
    .then(() => res.redirect(`/supplier`))
    .catch(err => console.log(err))

})


router.post('/', (req, res) => {
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

router.delete('/update/:id', (req, res) => {

  Supplier.findByIdAndRemove(req.params.id)
    .then(() => res.redirect(`/supplier`))
    .catch(err => console.log(err))

})

module.exports = router
