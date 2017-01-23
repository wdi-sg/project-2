const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/user');
const Profile = require('../models/profile');
const fs = require('fs');
const storage = multer.memoryStorage();
const upload = multer({
  storage : storage,
  limits : {
    fileSize : 500000
  }
});

router.get('/',function(req,res){
  //need to find other users and put them in this page....
  res.render('dashboard');
})

router.get('/profile/create',function(req,res){
  console.log('i can see the user'.red,req.user);
  res.render('create');
})

router.get('/profile',function(req,res){
  //need to find current user and put them on this page...
  Profile.findOne({user : req.user._id},function(err,data){
    if (!data){
      //if profile page does not exist redirect to create new profile...
      return res.redirect('/dashboard/profile/create');
    }
    console.log('look here'.red,data);
    let binaryImage = new Buffer(data.avatar).toString('base64');
    res.render('profile', {
      data : data,
      binaryImage : binaryImage
    });
  })
})

router.post('/profile/create', upload.single('avatar'),function(req,res){
  console.log('i can see the user 2'.yellow,req.user);
  console.log('what is inside req.body?'.green,req.body);
  console.log('is there something wrong here??'.red,req.body.description);
  console.log('can I see the file Buffer?'.blue,req.file);
  new Profile({
    description : req.body.description,
    user : req.user.id,
    avatar : req.file.buffer
  }).save(function(err,data){
    if (err) return res.status(422).send('error saving profile...');
    console.log('look here'.cyan,data);
    req.flash('success','profile created successfully!')
    res.redirect('/dashboard/profile');
  })
})

module.exports = router;
