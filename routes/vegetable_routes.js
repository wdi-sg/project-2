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

router.post('/update',(req,res) => {
  const suppInfo = {
    supp: req.body
  }
  res.render('vegetables/updateVeg', suppInfo)
})

//first get the id populate the ddl
//get the select value and see is from which array
//populate the form


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

router.put('/update', (req, res) => {
  // thankfully since we're using mongoose
  // we don't have to find and update separately
  // there's a method in mongoose just for that
  // `findByIdAndUpdate` http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
  var id = req.body
  var formData = req.body.veg
  var photo = result.secure_url
  formData.photo = photo

  Supplier.findByIdAndUpdate(req.body.id, {$push: {vegetables: formData}},
  {safe: true, upsert: true},
  function(err, model) {
      console.log(err);
  })
  .then(() => res.redirect(`/vegetable/${req.params.id}`))
  .catch(err => console.log(err))
  // after update is done, redirect back to resto id
  // this redirection can go to anywhere as long as you have the routes with you
})


router.post('/', upload.single('myFile'), function (req, res) {
  // console.log(req.file.path)
  cloudinary.uploader.upload(req.file.path, function (result) {

    var id = req.body
    var formData = req.body.veg
    var photo = result.secure_url

    // console.log(formData);
    // console.log(photo);
    formData.photo = photo
    // console.log(formData)

    // Supplier.findById(req.body.id).then(supplier => {
    //   supplier.vegetables.push(formData)
    //
    //   // console.log(supplier.vegetables)
    //   supplier.save()
    //   .then(
    //     ()=> res.redirect('/vegetable/new/${req.body.id}'),
    //     err => console.log(err)
    //   // .then(() => console.log('saved'),
    //   // // redirect(`/vegetable/new/${req.body.id}`),
    //   //   err => res.send(err)
    //   // )
    // })

    Supplier.findByIdAndUpdate(req.body.id, {$push: {vegetables: formData}},
    {safe: true, upsert: true},
    function(err, model) {
        console.log(err);
    })


  })
})


module.exports = router
