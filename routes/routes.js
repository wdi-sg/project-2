const express = require("express");
const router = express.Router();

const User = require('../models/user');
const passport = require("../helpers/passportinfo");
const isLoggedIn = require("../helpers/loginBlock");

const baseController = require("../controllers/homeController")
const AuthController = require("../controllers/AuthController")


// ----- Pages -----
router.get('/', function (req, res) {
    res.render('home');
});

router.get('/events', function (req, res) {
    res.render('users/events');
});

router.get('/login', function (req, res) {
    res.render('users/login');
});

router.get('/report', function (req, res) {
    res.render('users/report');
});

router.get('/reset', function (req, res) {
    res.render('users/reset');
});


router.post('/users/login',
  passport.authenticate("local", {
      sucessRedirect: "/",
      failureRedirect: "/users/login",
      failureFlash: "Invalid email and/or Password",
      successFlash: "You are logged in"
  }))



module.exports = router;