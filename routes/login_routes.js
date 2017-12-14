// require the model here
const Customer = require('../models/customer')
const express = require('express')
const router = express.Router()

const passport = require('../config/ppConfig')

router.get('/', (req, res) => {

  res.render('customers/login')
})

router.post('/', (req, res, next) => {
  console.log('post in')
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    console.log('user', user)
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next)
})

module.exports = router
