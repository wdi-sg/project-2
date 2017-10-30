const User = require('../models/user')
const express = require('express')
const router = express.Router()
const passport = require('../config/ppConfig')

router.get('/', (req, res) => {

  res.render('users/login')
})

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return next(err)
    if (!user) return  res.redirect('/login')
    req.logIn(user, (err) => {
      if (err) return next(err)
      return res.redirect(`/profile/${user.slug}`)

    })
       //next(user);

  })(req, res, next)
})



module.exports = router
