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
  var formData = req.body
  Partner.findByIdAndUpdate(req.user._id,
    {ride: {
      startPostal: formData.partner.startPostal,
      endPostal: formData.partner.endPostal,
      arrTime: formData.time
    }
    },
  {new: true},
  function (err, success) {
    if (err) return console.log(err)
    console.log(success)
    .then(() => res.redirect('/partners/profile'))
  }
)
})

router.get('/delete', (req, res) => {
  res.render('partners/delete')
})

router.delete('/delete/:id', (req, res) => {
  // res.send(req.params.id)
Partner.findByIdAndRemove(req.params.id)
.then( () => {
  res.redirect("/")
})  // Partner.findByIdAndRemove(req.params.id)
})
module.exports = router
