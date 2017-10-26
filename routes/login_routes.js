const User = require('../models/user')
const express = require('express')
const router = express.Router()
const passport = require('../config/ppConfig')

router.get('/', (req, res) => {
  // show the login form page
  // PITSTOP: when you're rendering, your POV is under `views`
  // no local data, cos we don't need to pass anything
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
      // next(user);

  })(req, res, next)
})

// router.post('/', passport.authenticate('local', {
//   successRedirect: `/profile/${req.user.slug}`,
//   failureRedirect: '/login'
// }))

// router.put(`/profile/${user.slug}`, (req,res) => {
//   var formData= req.body
//   User.findByIdAndUpdate
// })

module.exports = router
