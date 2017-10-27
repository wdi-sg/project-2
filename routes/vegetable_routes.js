const Vegetable = require('../models/vegetable')
const Supplier = require('../models/supplier')
const express = require('express')
const router = express.Router()
//cloudinary
const multer = require('multer')
const cloudinary = require('cloudinary')
var upload = multer({ dest: './uploads/' })



router.post('/new',(req,res) => {
  const suppInfo = {
    supp: req.body
  }
  res.render('vegetables/new', suppInfo)
})


router.get('/view',(req,res) => {
  Supplier.find()
  .then(suppliers => {
    // at this point we got our data so we can render our page

    res.render('admin/adminShow', {
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

// router.post('/table',(req,res) => {
//   const suppId = req.body.id
//   console.log('entered!')
//   Supplier.findById(req.body.id)
//     .then((data) => {
//       res.render('vegetables/table', { vegetables: data.vegetables, suppID: req.body.id})
//     })
//   .catch(err => {
//     console.log(err)
//   })
// })

router.put('/update', (req, res) => {
  // thankfully since we're using mongoose
  // we don't have to find and update separately
  // there's a method in mongoose just for that
  // `findByIdAndUpdate` http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
  var id = req.body
  var formData = req.body.veg
  var photo = result.secure_url
  formData.photo = photo

  Supplier.findByIdAndUpdate(req.body.id, {$push: {vegetables: formData.id }},
  {safe: true, upsert: true},
  function(err, model) {
      console.log(err);
  })
  .then(() => res.redirect(`/vegetable/${req.params.id}`))
  .catch(err => console.log(err))
  // after update is done, redirect back to resto id
  // this redirection can go to anywhere as long as you have the routes with you
})

router.get('/table/:suppID',(req,res) => {
  const suppId = req.params.suppID
  Supplier.findById(suppId)
  .then((data) => {
    res.render('vegetables/table', { vegetables: data.vegetables, suppID: req.body.id})
  })
  .catch(err => {
    console.log(err)
  })
})

router.put('/update/:suppID', function (req, res) {
  // let vegOwnerId = req.params.suppID
  // console.log(vegOwnerId) //supplier ID
  // console.log(req.body.id) //vege ID in supplier
  // Supplier.findById(vegOwnerId).then(output => console.log(output.vegetables))

})


router.post('/', upload.single('myFile'), function (req, res) {
  // console.log(req.file.path)
  cloudinary.uploader.upload(req.file.path, function (result) {

    var id = req.body
    var formData = req.body.veg
    var photo = result.secure_url
    formData.photo = photo

    //{ txtName: 'aa', txtPrice: '1', txtQuantity: '1' }

    const newVege = new Vegetable()
    newVege.name = formData.txtName
    newVege.price = formData.txtPrice
    newVege.quantity = formData.txtQuantity
    newVege.photo = formData.photo
    newVege.owner = req.body.id
    newVege.save()
      .then((vege) => {
        Supplier.findByIdAndUpdate(req.body.id, {$push: {vegetables: vege}},
          {safe: true, upsert: true},
          function(err, model) {
            if (err) console.log(err);
            res.redirect('/admin/view')
          })
      })
  })
})


module.exports = router
