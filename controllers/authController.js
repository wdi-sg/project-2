// model
const User = require('../models/user');

const passport = require('../helpers/passportInfo');

exports.login = (req, res) => {
  res.render('login');
};

exports.register = (req, res) => {
  res.render('register');
};

exports.signup = (req, res) => {
  // create account in database, user
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  }, (err, createdUser) => {
    if (err) {
      req.flash('error', 'Could not create user account.');
      res.redirect('/register');
    } else {
      // after account successfully created, authenticate user
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Welcome! Account created.',
      })(req, res);
    }
  });
};

exports.logout = (req, res) => {
  req.logout();
  req.flash('error', 'You are now logged out!');
  res.redirect('/login');
};
