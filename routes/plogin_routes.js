const Partner = require('../models/partner')
const express = require('express')
const router = express.Router()
const passport = require('../config/ppConfig')
const {hasLoggedOut} = require('../helpers')

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
    user => res.redirect('/partners/login'),
    err => res.send(err)
  )
})

router.get('/login', (req, res) => {
  res.render('partners/pLogin')
})
router.post('/login', passport.authenticate('partner-local', {
  successRedirect: '/partners/profile',
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
    res.redirect('/partners/profile')
  }
)
})

router.get('/delete', (req, res) => {
  res.render('partners/delete')
})

router.delete('/delete', hasLoggedOut, (req, res, next) => {
  console.log('body', req.body)
  console.log('user', req.user)
  var id = req.user._id
  req.logout()
  Partner.findByIdAndRemove(id, function (err) {
    if (err) { return err }
    res.redirect('/partners/register')
  })
})

module.exports = router
