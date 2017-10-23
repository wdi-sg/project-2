
const User = require('../models/user')
const express = require('express')
const passport = require('../config/ppConfig');
const router = express.Router()

router.get('/', (req, res) => {
//when rendering, your POV is under `views`
  res.render('users/login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'users/login'
}));
module.exports = router
