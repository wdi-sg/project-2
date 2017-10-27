const passport = require('../config/ppConfig')
const User = require('../models/user')
const express = require('express')

const router = express.Router()

const cloudinary = require('cloudinary')
const multer = require('multer')
const upload = multer({ dest: './uploads/' })


router.get('/', (req, res) => {
  res.render('user/register')
})


router.post('/', upload.single('image'), (req, res) => {
  const userData = req.body.user




  cloudinary.uploader.upload(req.file.path, function(result) {
    let newUser = new User({
      name : userData.name,
      email : userData.email,
      password : userData.password,
      imageUrl : result.secure_url,
      //preferences : userData.preferences,
      // level : String,

    })
    newUser.save()
    .then(
      user => {
        passport.authenticate('local', {
          successRedirect : '/'
        }) (req, res)
      },
      err => res.send(err)
    )

  })


})

module.exports = router
