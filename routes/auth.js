const express = require('express');
const router = express.Router();
const passport = require('../passport_config/passport');
const User = require('../models/user');

router.get('/login',function(req,res){
  res.render('login');
})

router.get('/register',function(req,res){
  res.render('register');
})

router.get('/logout',function(req,res){
  req.logout();
  req.flash('success','You have logged out!');
  res.redirect('/');
})

router.post('/login',passport.authenticate('local',{
  successRedirect : '/dashboard/',
  failureRedirect : '/',
  failureFlash : 'Invalid username and/or password',
  successFlash : 'You have logged in!'
}));

router.post('/register',function(req,res){
  new User({
    name : req.body.name,
    email : req.body.email,
    password : req.body.password
  }).save(function(err,data){
    if (err){
      console.log('could not create user acct, mongoose validation kicked in'.red);
      req.flash('error','could not create user acct');
      res.redirect('/');
    } else {
      // authenticate the user...
      console.log('successfully created a user!');
      passport.authenticate('local',{
        successRedirect : '/dashboard/',
        successFlash : 'Account created and logged in!'
      })(req,res);
    }
  })
})

module.exports = router;
