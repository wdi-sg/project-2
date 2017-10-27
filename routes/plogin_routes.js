const Partner = require('../models/partner')
const express = require('express')
const router = express.Router()
const passport = require('../config/ppConfig')

router.get('/register', (req, res) => {
  res.render('partners/pRegister')
})

router.post('/register', (req, res) => {
  var formData = req.body

  var newPartner = new Partner({
    name: formData.partner.name,
    email: formData.partner.email,
    password: formData.partner.password,
    mobile: formData.partner.mobile,
    type: formData.user.type
  })

  newPartner.save()
  .then(
    user => res.redirect('/'),
    err => res.send(err)
  )
})

router.get('/login', (req, res) => {
  res.render('partners/pLogin')
})
router.post('/login', passport.authenticate('partner-local', {
  successRedirect: '/',
  failureRedirect: '/partners/login'
}))

router.get('/profile', (req, res) => {
  res.render('partners/pRides')
})

router.post('/profile', (req, res) => {
  Partner.findByIdAndUpdate(req.user._id,
    {ride: {
      startPostal: req.body.partner.startPostal,
      endPostal: req.body.partner.endPostal,
      arrTime: req.body.time
    }
    },
  {new: true},
  function (err, success) {
    if (err) return console.log(err)
    console.log(success)
    // res.send('sucess')
  }
)
})
module.exports = router
