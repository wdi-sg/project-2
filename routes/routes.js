const express = require("express");
const router = express.Router();

const User = require('../models/user');
const Dog = require("../models/dog");

const passport = require("../helpers/passportInfo");
const isLoggedIn = require("../helpers/loginBlock");

const baseController = require("../controllers/homeController")
const AuthController = require("../controllers/AuthController")



// ----- Pages -----
router.get('/', function (req, res) {
    res.render('home');
});

router.post ('/users/contactus', function (req, res) {
    res.send ('Contact Us OK');
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




// ----- Edit Form / Database -----
router.get('/editform/:id', function (req, res) {

  Dog.findById(req.params.id, function (error, dogs){
    if(error) {
      console.log(error);
      return;
    }
    res.render('users/editform', {dog: dogs});
    // res.send(dogs);
    // console.log(dogs);
    //
    // res.render('users/editform', { allDogs: dogs });
    // console.log(dogs)
  });
});









router.post ('/users/login', function (req, res) {
    res.send ('Welcome');
});


router.get('/about', function (req, res) {
    res.render('users/about');
});




router.get('/login', function (req, res) {
    res.render('users/login');
});






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

    console.log(entry);


    Dog.create(entry, (err) => {
      if(err) console.log(err)
      res.send('Success');
    });
});



module.exports = router;



// router.post('/users/login',
//   passport.authenticate("local", {
//       sucessRedirect: "/",
//       failureRedirect: "/users/login",
//       failureFlash: "Invalid email and/or Password",
//       successFlash: "You are logged in"
//   }))


//   router.get('/auth/register', AuthController.register) //register route
//   router.post('/auth/register', AuthController.signup) //register post route
//   router.get('/auth/logout', AuthController.logout)
