const express = require("express");
const router = express.Router();

const User = require('../models/user');
const Dog = require("../models/dog");

const passport = require("../helpers/passportInfo");
const isLoggedIn = require("../helpers/loginBlock");

const baseController = require("../controllers/homeController")
const AuthController = require("../controllers/authController")



// ----- Pages -----

router.get('/', function (req, res) {
    // see the current user
    // currentuser
    // return res.send(req.user)
    res.render('home');
});

router.post ('/users/contactus', function (req, res) {
    res.send ('Contact Us OK');
});


router.get('/report', function (req, res) {
    res.render('users/report');
});


router.post ('/users/report', function (req, res) {
    res.send ('Report OK');
});



router.get('/forgot', function (req, res) {
    res.render('users/forgot');
});



router.get('/new', function (req, res) {
    res.render('dogs/new');
});



router.post('/new', function (req, res) {
    res.send('/welcome');
});



router.post ('/users/login', function (req, res) {
    res.send ('login');
});



router.get('/login', function (req, res) {
    res.render('users/login');
});



router.get('/editform', function (req, res) {
    res.render('users/editform');
});





router.post('/users/login',
  passport.authenticate("local", {
      sucessRedirect: "/",
      failureRedirect: "/users/login",
      failureFlash: "Invalid email and/or Password",
      successFlash: "You are logged in"
  }))



//   router.get('/signup', authController.signup) //register route
//   router.post('/signup', authController.signup) //register post route
//   router.get('/logout', authController.logout)





// ----- Search -----

router.get('/search', function (req, res) {
    res.render('users/search');
});


router.post('/search', function (req, res) {
    Dog.find({ breed: req.body.breed }, function (error, result){
    if(error) console.log(error);
    res.send(result);
    })
});






// ----- Read Database -----

router.get('/welcome', function (req, res) {

  Dog.find({}, function (error, dogs){
    if(error) {
      console.log(error);
      return;
    }

    res.render('users/welcome', { allDogs: dogs });
    console.log(dogs)
  });
});





// Database – Create User Sign Up
router.get('/signup', function (req, res) {
    res.render('users/signup');
});


router.post ('/users/signup', function (req, res) {
    let entry = new User();

      entry.firstname = req.body.firstname
      entry.lastname = req.body.lastname
      entry.email = req.body.email
      entry.password = req.body.password

      console.log(entry);

    User.create(entry, (err) => {
      if(err) console.log(err)
      res.send (entry);
    });
});



// ----- Edit / Update-----

router.get ('/:id/edit', function(req, res) {
  res.send(`edit ok ${req.params.id}`);
  // console log(req.params.id);
  //
  // Dog.edit({"_id": req.params.id}, function (error, docs) {
  //
  //   if (error) return error;
  //   console.log(docs);
  //   res.redirect('/welcome');
  // });
});



// router.get('/:id/edit', function (req, res) {
  
//       let name = parseInt(req.body.name);
//       let breed = parseInt(req.body.breed);
//       let dob = parseInt(req.body.dob);
//       let gender = parseInt(req.body.gender);
//       let size = parseInt(req.body.size);
//       let temperament = parseInt(req.body.temperament);

// Dog.findByIdAndUpdate(req.params.id, {
//     $set: {
//         name: req.body.name,
//         breed: req.body.name,
//         dob: req.body.dob,
//         gender: req.body.gender,
//         size: req.body.size,
//         temperament: req.body.temperament
//         }
//     }, function(error) {
//         req.flash("Edited");
//         res.redirect('/welcome' + req.params.id);
// });


router.get('/:dog_id/', function (req, res) {

    Dog.findById({"_id": req.params.id}, function (err, dog) {
        if (err) {
            res.send(err);
        }
        dog.name = req.body.name;
        dog.breed = req.body.breed;
        dog.dob = req.body.dob;
        dog.gender = req.body.gender;
        dog.temperament = req.body.temperament
       
        dog.save(function (err) {
            if (err) {  
                res.send(err);
            } else {
            res.send({ message: 'Updated!' });
            }      
        });
    });
});





// ----- Deletion -----

router.delete('/delete/:id', function(req, res) {
  // res.send(`im here ${req.params.id}`)
  console.log(req.params.id);

  Dog.remove({"_id": req.params.id}, function (error, docs) {

    if (error) return error;
    console.log(docs);
    res.redirect('/welcome');
  });
});



// Database – Create Dog Details
router.get('/dogs/new', function (req, res) {
    res.render('dogs/new');
});


router.post('/dogs/new', function (req, res) {
  let entry = new Dog();

    entry.name = req.body.name
    entry.breed = req.body.breed
    entry.dob = req.body.dob
    entry.gender = req.body.gender
    entry.size = req.body.size
    entry.temperament = req.body.temperament
    // entry.user = // this should be the user id
                 // how can we get the user id without typing it
                 // in the form?
    console.log(entry);


    Dog.create(entry, (err) => {
      if(err) console.log(err)
      res.send('welcome');
    });
});



module.exports = router;
