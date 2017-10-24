const express = require('express')
const router = express.Router()
const passport = require('../config/ppConfig')


router.get('/', (req, res) => {
  res.render('users/login')
})

router.post('/', passport.authenticate('local', {
  successRedirect: `/profile/:`,
  failureRedirect: '/login'
}))

// router.post('/', (req, res) => {
//   var formData = req.body.user
//
//   User.findOne({ email: formData.email })
//   .then(user => {
//     if (!user) {
//       console.log('incorrect email')
//       return res.redirect('/login')
//     }
//     user.validPassword(formData.password, (err, valid) => {
//       if (!valid) {
//         console.log('password is incorrect')
//         res.redirect('/login')
//       }
//       console.log('comparison is a match');
//       res.redirect('/')
//     })
//   },
  // err => res.send('can\'t access database'))
// })

module.exports = router
