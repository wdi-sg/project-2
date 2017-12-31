const express = require("express");
const router = express.Router();

const User = require('../models/user');
const passport = require("../helpers/passportinfo");
const isLoggedIn = require("../helpers/loginBlock");

const baseController = require("../controllers/homeController")
// const AuthController = require("../controllers/AuthController")


//----- Home auth acess -------
router.get('/', baseController.index)


// ----- Login Page -----
router.get('/login', function (req, res) {
    res.render('users/loginsignup');
});


router.post('/users/loginsignup',
  passport.authenticate("local", {
      sucessRedirect: "/",
      failureRedirect: "/users/loginsignup",
      failureFlash: "Invalid email and/or Password",
      successFlash: "You are logged in"
  }))



// ----- Set Up Routes -----
// router.get('/auth/register', authController.register) //register route
// router.post('/auth/register', authController.signup) //register post route
// router.get('/auth/logout', authController.logout)





module.exports = router;