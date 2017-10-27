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
    mobile: formData.partner.mobile
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

module.exports = router
