const User = require('../models/user')
const express = require('express')
const router = express.Router()
const passport = require('../config/ppConfig')

router.get('/', (req, res) => {
  res.render('users/login')
})

// router.post('/', (req, res) => {
//   // return res.send(req.body)
//   const userData = req.body.user
//
//   User.findOne({
//     email: userData.email
//   })
//   .then(
//     user => {
//       if (!user) {
//         console.log('user is null')
//         return res.redirect('/login')
//       }
//
//       user.validPassword(userData.password, (err, valid) => {
//         if(! valid) {
//           console.log('comparison failed')
//           return res.redirect('/login')
//         }
//
//         console.log('comparison success');
//         res.redirect(`/profile/${user.slug}`)
//       })
//     },
//     err => res.send('error is found')
//   )
// })

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}))

module.exports = router
