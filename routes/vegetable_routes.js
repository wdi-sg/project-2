const Vegetable = require('../models/vegetable')
const Supplier = require('../models/supplier')
const express = require('express')
const router = express.Router()
//cloudinary
const multer = require('multer')
const cloudinary = require('cloudinary')
var upload = multer({
  dest: './uploads/'
})



router.post('/new', (req, res) => {
  const suppInfo = {
    supp: req.body
  }
  res.render('vegetables/new', suppInfo)
})


router.get('/view', (req, res) => {
  Supplier.find()
    .then(suppliers => {

      res.render('admin/adminShow', {
        suppliers
      })
    })
    .catch(err => {
      console.log(err)
    })
})

router.put('/update/:id', (req, res) => {

  var vegId = req.body.id
  console.log(req.body)

  Vegetable.findById(vegId)
    .then((veg) => {

      veg.set({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
      })
      veg.save()
        .then(
          (result) => res.redirect(`/vegetable/table/${veg.owner}`),
          () => console.log('ERROR!!')
        )

    })

})

router.get('/table/:suppID', (req, res) => {
  const suppId = req.params.suppID
  Supplier.findById(suppId)
    .populate('vegetables')
    .then((data) => {
      console.log('get!', data)
      res.render('vegetables/table', {
        vegetables: data.vegetables,
        suppID: req.body.id
      })
    })
    .catch(err => {
      console.log(err)
    })
})


router.post('/', upload.single('myFile'), function(req, res) {
  // console.log(req.file.path)
  cloudinary.uploader.upload(req.file.path, function(result) {

    var id = req.body
    var formData = req.body.veg
    var photo = result.secure_url
    formData.photo = photo

    const newVege = new Vegetable()
    newVege.name = formData.txtName
    newVege.price = formData.txtPrice
    newVege.quantity = formData.txtQuantity
    newVege.photo = formData.photo
    newVege.owner = req.body.id
    newVege.save()
      .then((vege) => {
        Supplier.findByIdAndUpdate(req.body.id, {
            $push: {
              vegetables: vege
            }
          }, {
            safe: true,
            upsert: true
          },
          function(err, model) {
            if (err) console.log(err);
            res.redirect('/admin/view')
          })
      })
  })
})


module.exports = router
