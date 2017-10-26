const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('../config/ppConfig')
// const sgMail = require('@sendgrid/mail')

// const { findCurrentQuote } = require('../helpers')

router.get('/', (req, res) => {
  res.render('users/register')
})

router.post('/', (req, res) => {
  var formData = req.body.user
  console.log(formData)

  var newUser = new User({
    name: formData.name,
    email: formData.email,
    password: formData.password,
    subscribeQuote: formData.subscribeQuote
  })
  newUser.save()
  .then((newUser) => {
    passport.authenticate('local', {
      successRedirect: '/'
    })(req, res)
  },
  err => {
    console.log('err')
    res.redirect('users/register')
  })
})


module.exports = router


// findCurrentQuote()
// .then(dailyQuote => {
//   // if newUser.subscribeQuote === true
//   // send email, telling them that they're subscribing
//   if (newUser.subscribeQuote) {
//     sgMail.setApiKey(process.env.API_KEY)
//     const msg = {
//       to: newUser.email,
//       from: 'matthewfoys@gmail.com',
//       subject: `Good Morning ${newUser.name}! Here is your morning quote`,
//       text: `Morning ${newUser.name} - Daily Quote`,
//       html: `<strong>Blessed morning ${newUser.name}!<br/>
//       Your Daily Quote: ${dailyQuote.quote} <br/>
//       Author: ${dailyQuote.author} <br/>
//       </strong>`
//     }
//     sgMail.send(msg)
//     .then(output => console.log('success'))
//     .catch(err => console.log(err))
//   }
// })
