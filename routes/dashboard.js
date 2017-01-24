const express = require('express');
const mongoose = require('mongoose');
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

//util for shuffling
function fisherYates(arr) {
    var j, x, i;
    for (i = arr.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = arr[i - 1];
        arr[i - 1] = arr[j];
        arr[j] = x;
    }
    return arr;
}

router.get('/',function(req,res){
  //need to find other users and put them in this page....
  Profile.find({}).populate('user').exec(function(err,data){
    if (err) console.log(err);
    console.log(data);
    data = fisherYates(data);
    let binaryImageArr = data.map(function(value,index){
      return new Buffer(value.avatar).toString('base64');
    })
    // console.log(binaryImageArr);
    res.render('dashboard', {
      data : data,
      binaryImageArr : binaryImageArr
    });
  })
})

router.get('/settings',function(req,res){
  console.log('iseemanydeadpeople'.red,req.user);
  res.render('settings');
})

router.get('/profile/create',function(req,res){
  console.log('i can see the user'.red,req.user);
  res.render('create');
})

router.get('/profile/edit',function(req,res){
  console.log('i can see the user'.bgRed,req.user);
  Profile.findOne({user : req.user._id}).populate('user').exec(function(err,data){
    if (err) console.log(err);
    console.log(data);
    res.render('edit',{data:data})
  })
})

router.get('/profile/:id',function(req,res){
  console.log('i can see the user'.red,req.user);
  console.log('the keyed in id is'.cyan,req.params.id);
  Profile.findOne({user : req.params.id}).populate('user').exec(function(err,data){
    //checking if a user manually types in his own profile to change his rating.
    if (err) console.log(err);
    if (req.user._id.equals(req.params.id)){
      req.flash('error','cant rate yourself... are you a narcissist?')
      res.redirect('/dashboard/profile');
    }
    let binaryImage = new Buffer(data.avatar).toString('base64');
    console.log('populated data',data);
    res.render('rate',{
      data: data,
      binaryImage : binaryImage,
      username : data.user.name
    });
  })
})

router.get('/profile',function(req,res){
  //need to find current user and put them on this page...
  Profile.findOne({user : req.user._id},function(err,data){
    if (err) console.log(err);
    if (!data){
      //if profile page does not exist redirect to create new profile...
      return res.redirect('/dashboard/profile/create');
    }
    console.log('look here'.red,data);
    let binaryImage = new Buffer(data.avatar).toString('base64');
    res.render('profile', {
      data : data,
      binaryImage : binaryImage,
      username : req.user.name
    });
  })
})

router.post('/profile/create', upload.single('avatar'),function(req,res){
  console.log('i can see the user 2'.yellow,req.user);
  console.log('what is inside req.body?'.green,req.body);
  console.log('is there something wrong here??'.red,req.body.description);
  console.log('can I see the file Buffer?'.blue,req.file);
  if (!req.file){
    fs.readFile('public/assets/default.jpg',function(err,data){
      if (err) console.log(err);
      new Profile({
        description : req.body.description,
        user : req.user.id,
        avatar : data
      }).save(function(err,data2){
        if (err) return res.status(422).send('error saving profile...');
        console.log('look here default avatar'.blue,data2);
        req.flash('success','profile created successfully!')
        res.redirect('/dashboard/profile');
      })
    })
  } else {
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
  }
})

router.put('/profile/edit', upload.single('avatar'), function(req,res){
  console.log('iseedeadpeople'.red,req.user);
  if (!req.file){
    Profile.update({user : req.user._id},{ $set : {
      description : req.body.description,
    }}, function(err,data){
      if (err) console.log(err);
      console.log('successfully edited profile descrip'.yellow,data);
      req.flash('success', 'successfully edited your profile!');
      res.redirect('/dashboard/profile');
    })
  } else {
    Profile.update({user : req.user._id},{ $set : {
      description : req.body.description,
      avatar : req.file.buffer
    }}, function(err,data){
      if (err) console.log(err);
      console.log('successfully edited avatar + profile descrip'.yellow,data);
      req.flash('success', 'successfully edited your profile!');
      res.redirect('/dashboard/profile');
    })
  }
})

router.delete('/settings/delete',function(req,res){
  console.log('toomanydeadpeopletosee'.red,req.user);
  Profile.findOneAndRemove({user : req.user._id},function(err,data){
    if (err) console.log(err);
    console.log('delete profile successfully'.america);
    User.findOneAndRemove({_id : req.user._id},function(err,data){
      if (err) console.log(err);
      console.log('deleted account successfully'.america);
      req.flash('sucess','account deleted successfully!!')
      res.redirect('/');
    })
  })
})

module.exports = router;
