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

    Supplier.findById(req.body.id).then(supplier => {
      supplier.vegetables.push(formData)

      // console.log(supplier.vegetables)
      supplier.save().then(()=> console.log("saved")).catch(err => console.log(err))
      // .then(() => console.log('saved'),
      // // redirect(`/vegetable/new/${req.body.id}`),
      //   err => res.send(err)
      // )
    })

    // Supplier.findByIdAndUpdate(req.body.id, {$push: {vegetables: formData}},
    // {safe: true, upsert: true},
    // function(err, model) {
    //     console.log(err);
    // })



    // console.log(id.findById());
    //id.findById()

    // get the suplier -> findbyid
    // then, access to the vegelist array
    // update new vegi to the array
      // .push()
    // .save()
      // then redirect to somewhere


  })
})
// router.post('/vegetable', upload.single('image'), function (req, res) {
//   cloudinary.uploader.upload(req.file.path, function (result) {
//     var formData = req.body.veg
//
//     var newVeg = new Vegetable({
//       photo: result.secure_url,
//       name: req.body.veg.txtName,
//       price: req.body.veg.txtPrice,
//       quantity: req.user.veg.txtQuantity
//     })
//
//
//
//     newVeg.save()
//     .then(
//       () => res.redirect('/vegetable/new{{}}'),
//       err => res.send(err)
//     )
//   })
// })

module.exports = router
