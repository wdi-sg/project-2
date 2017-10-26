
const User = require('../models/user')
const express = require('express')
const router = express.Router()
const passport = require('../config/ppConfig');

router.get('/', (req, res) => {
//when rendering, your POV is under `views`
  res.render('users/login')
})

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'users/login'
}));
module.exports = router
