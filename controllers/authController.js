const passport = require('../helpers/passportInfo')
const User = require('../models/user');


//------ Get Register Page -----
exports.register = (req, res) => {
    res.render("auth/register")
};


//------ Get Login Page -----
exports.login = (req, res) => {
    res.render("auth/login")
};


//------ Get Logout Page -----
exports.logout = (req, res) => {
    req.logout()
    req.flash("You are logged out!")
    redirect("auth/login")
};


// ----- Post Sign Up -----
exports.signup = (req, res) => {

    req.checkBody('firstname', 'First Name Required').notEmpty()
    req.checkBody('lastname', 'Last Name Required').notEmpty()
    req.checkBody('email', 'Email Required').notEmpty()
    req.checkBody('email', 'Email Required').isEmail()
    req.checkBody('password', 'Password Required').notEmpty()
    req.checkBody('password2', 'Password Required').notEmpty()
    req.checkBody('password', 'Password is not equal to password 2').equals(req.body.password2)


    let errors = req.validationErrors()
    console.log(errors);

        if(errors){
        res.render('users/signup', { errors : errors})

        } else {

    User.create({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        password: req.body.password,
    }, (err, createdUser) => {

        if(err) {
          req.flash('error', 'Could not create user account');
          res.redirect('/signup');
        }
        else {


// Send user to auth page of profile
    passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
        })(req, res);
        }
        })
    }
  }

