const User = require('../models/user')
const express = require('express')
const router = express.Router()
const passport = require('../config/ppConfig');

//rendering homepage
router.get('/', (req,res)=>{
  res.render('login',{
    title: "Welcome to Fridge Magnets"
  })
})

router.post('/', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login' //TODO: need to add alert to alert the user if the user is not existence.
}));

module.exports = router
