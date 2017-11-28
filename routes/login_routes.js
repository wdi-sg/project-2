const User = require('../models/user')
const express = require('express')
const router = express.Router()
const passport = require('../config/ppConfig')
const userCode = process.env.USER_CODE

router.get('/', (req, res) => {
  res.render('users/login')
})

router.post('/', (req, res) => {
  const userData = req.body.user
  User.findOne({
    email: userData.email
  })
  .then(
    user => {
      if (!user) {
        return res.redirect('/login')
      }
      user.validPassword(userData.password, (err, valid) => {
        if (!valid) {
          return res.redirect('/login')
        }
        res.redirect('/')
      })
    },
  err => res.send('error is found')
  )
})

// router.post('/', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: 'login'
// }))

module.exports = router
